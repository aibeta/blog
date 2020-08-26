# Jenkins

## nuxtjs 的项目配置

### 参数化构建

- 选项参数-name：action
- 选项参数-选项：deploy roolback
- 字符参数-name：branch
- 字符参数-default: master
- 字符参数-name: version
- 字符参数-desc: 发布时才需要。默认为 version="${version-`date '+%Y-%m-%d-%H-%M-%S-srcmd'`}"
- active choices reactive parameter-name: roolback
- active choices reactive parameter-script:

```shell
path="${jenkinsProject.workspace}/backup/"
rollback=['bash', '-c', "ls -t1 ${path} "].execute().text.readLines()
if (action.equals("rollback")) {
  return rollback
} else {
  return ["选择RollBack后显示"]
}
```

### 可选的构建过程 condition step

- Dont excute when action == roolback

```shell
if [ "${action}" = "rollback" ]; then
    exit -1;
fi
```

- Otherwise excute the shell

```shell
# enviroment
export JENKINS_HOME=${JENKINS_HOME:-/var/jenkins_home}
export PROJECT_GROUP=html
export PROJECT_NAME=pc
# project working directory
export PROJECT_WD=${JENKINS_HOME}/repos/${PROJECT_GROUP}/${PROJECT_NAME}
# append nodejs path
export PATH=${JENKINS_HOME}/server/nodejs/bin:$PATH

# version by user input
version="${version-`date '+%Y-%m-%d-%H-%M-%S-srcmd'`}"

echo ${PROJECT_WD} # /var/jenkins_home/repos/html/pc
echo $WORKSPACE # /var/jenkins_home/workspace/pc

# create project is not exist
if [ ! -d "${PROJECT_WD}" ] ; then
    git clone git@git.yueyouxs.com:${PROJECT_GROUP}/${PROJECT_NAME}.git ${PROJECT_WD};
fi

# checkout brannch and pull
cd ${PROJECT_WD} && git fetch --all && git checkout . && git checkout $branch && git pull origin $branch

# build
alias cnpm='npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist'
cnpm i && cnpm run build

# zip files
tar zcf ${PROJECT_NAME}.tar.gz ./.nuxt node_modules .env ecosystem.config.js nuxt.config.js package.json

# move file to workspace
mv ${PROJECT_WD}/${PROJECT_NAME}.tar.gz ${WORKSPACE}/${PROJECT_NAME}.tar.gz
```

### 执行 shell

两个功能，回滚，或者备份

```shell
export JENKINS_HOME=${JENKINS_HOME:-/var/jenkins_home}
export PROJECT_GROUP=html
export PROJECT_NAME=pc

version="${version-`date '+%Y-%m-%d-%H-%M-%S-srcmd'`}"

echo $WORKSPACE # /var/jenkins_home/workspace/pc
backup_dir=${WORKSPACE}/backup
mkdir -p $backup_dir

# 本次构建的包
current_tar=${WORKSPACE}/${PROJECT_NAME}.tar.gz

if [ "$action" == "rollback" ]; then
    # 命令是回滚时，直接复制一个包
    # ${roolback} 是用户选择的 rollback 的包
    cp $backup_dir/${rollback} $current_tar
else
    ## 备份当前构建的包
    backup_tar=$backup_dir/${PROJECT_NAME}-${version}.tar.gz
    cp $current_tar $backup_tar

    ## 进入备份路径下
    ## 如果超过10个包，就删除最早的
    cd $backup_dir
    total_file_num=`ls -l | grep -v 'total' | wc -l`
    if [ $total_file_num -gt 10 ];
    then
        num=`expr $total_file_num - 10`
        files=`ls -ltr | grep -v 'total' | awk '{print $9}' | head -n $num`
        echo $files | xargs rm -f
        echo "保留10个备份，删除早期备份: " $files
    fi
fi
```

### 通过 ssh 发布（publish over ssh）

- name: `server-100`，这里是配置的服务器地址
- source file: `*.tar.gz`，这里填的是 workspace 下面的文件，所以在这里就是我们上面的 $current_tar
- remote direcotry: `html/pc`，这里是传输的路径

执行命令，里面的 JOB_NAME 是我们的项目名称

```shell
cd /data/www/html/pc && tar zxf ${JOB_NAME}.tar.gz && rm -f ${JOB_NAME}.tar.gz && pm2 delete all && pm2 start
```
