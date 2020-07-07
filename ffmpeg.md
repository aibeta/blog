# Ffmpeg

```bash
// -af filter_graph    set audio filters

ffmpeg -i tick2.mp3 -af "apad=pad_dur=1" output.mp3
```

### 获取mp3长度

```bash
ffmpeg -i tick2.mp3 2>&1 | grep Duration

ffmpeg -i tick2.mp3 -af "apad=pad_dur=0.42:loop=300" tick2_1percent2s.mp3;

for i in {1..600}; do cat tick2_1percent2s.mp3 >> tick2_1percent2_10min.mp3; done
```

拼接文件

```bash
for i in {1..100}; do cat tick2.mp3 >> output.mp3; done
```

```bash
ffmpeg -t 0.08 -i tick2.mp3 -acodec copy tick3.mp3
```