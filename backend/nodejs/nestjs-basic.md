# Nestjs Basic

### controllers

负责处理客户端的请求，并返回响应，路由机制会控制请求进入哪个 controller，每个 controller 可以有多个路由。

我们可以通过类和装饰器来创建 controller，装饰器和带有 metadata 的类使nest可以创建路由表。

controller 是属于 module 的，所以我们在 `@Module`装饰器里要包含这个 controller

```jsx
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

### 路由

我们使用 `@controller(cats)`装饰器来定义一个controller，cats 是我们的路由前缀，这会让我们组织一系列路由变得简单。

```jsx
import { Controller, Get, Req} from '@nestjs/common';

@Controller('cats');
export class CatsController() {
	@Get();
	findAll(@Req() request: Requset): string {
		return 'all cats';
	}
}
```

`@Get()`装饰器，是一个 http 请求装饰器，这个装饰器告诉 nest 创建一个在 cats 路由下 get 请求的 handler，也就是说 nest 会把所有 `GET /cats`  下的请求map到这个handler。

如果带上参数 `@Get('profile')` ，那么 nest 会 map `GET /cats/profile`到这个handler。

所谓的 handler，就是处理函数，在这里就是 `findAll`方法，这个名字是可以自定义的，不需要特定的名字。

在 handler 里面我们直接返回了字符串，注意如果我们的是基本的js类型，那么 nest 会直接返回这个值。如果是对象或者数组，nets 会将它序列化后返回给客户端。

这里也可以使用 express 的响应对象，使用 `@Res()`装饰器即可，`findAll(@Res() response)`。默认使用的是 `@next()`。

我们在上面代码里使用的是 `@Req()`装饰器，包含里 http request 的信息，通常我们不这样使用，而是使用粒度更小的装饰器

- `@Session()`
- `@Param(key?:string)`
- `@Body(key?:string)`
- `@Query(key?:string)`
- `@Header(name?:string)`

http请求的装饰器除了上面的那些，还有`@Put(), @Delete(), @Patch(), @Options(), @Head(), and @All()。`

同时这些装饰器支持 wildcards 路由，如`@Get('ab*cd')`会匹配 `abcd, ab_cd, abecd`等等。

### 其它的装饰器

- `@HttpCode(204)` 会替代默认的200，201(POST)
- `@Header('Cache-Control', 'none')`
- `@Redirect(url, 301)`
- `Get(':id')` 后，会拿到 `/cats/1` 的路由数据

    ```jsx
    @Get(':id')
    findOne(@Param() params): string {
    	return params.id;
    }
    ```

- 还支持子域名
- GraphQL 应用的 pre-request caching 需要控制scope

### 异步

```jsx
@Get()
async findAll(): Promise<any[]> {
  return [];
}

// RxJS 的observable stream
@Get()
findAll(): Observable<any[]> {
  return of([]);
}
```

### Data transfer Object schema

DTO 定义的是数据的传输格式，在 dto 里面我们最好使用 从 class 来定义。因为诸如 pipes 这样的特性会在 runtime 时访问 metatype，如果用 interface 定义，就引用不到了。

```jsx
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
```

## Provider

nestjs里面的几个基础概念：provider-service、repositories、factories、helpers。

provider 的核心理念是它可以注入依赖，使得对象之间可以创建多种关系。

在程序里，一个 provider 就是一个有着 `@Injectable()`的一个类。

### service

我们创建一个让 controller 来使用的 service，provider 是一个好的选择。

```jsx
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

`@Injectable()`装饰器会 attaches metadata，告诉 nest 这是一个 provider。

为什么这里又用了 interface 呢？dto 是在 controller 里面用的。

我们看一下 controller 文件

```jsx
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

注意 `CatService`通过 class 的构造函数被注入。使用 private 语法可以在同时声明和初始化 `catsService` 成员。

### 依赖注入

nest 强烈依赖于依赖注入这个设计模式。通过下面的代码和typescript 的能力，nest 通过创建和返回一个 `CatsService`实例来resolve `CatsService`

```jsx
constructor(private catsService: CatsService) {}
```

### Scopes

provider 是和应用的生命周期同步的，应用启动时，每个依赖都必须被 resolved，因此每个 provider 都必须被实例化。同时 nest 也支持根据请求scoped 的 provider。

### 自定义Provider

我们也可以使用类、普通值、同步和异步工厂来做provider。

### 可选的 Provider

比如一个类依赖于一个配置对象，但是没有，那么就使用默认的值，这个时候的依赖是可选的，使用`@Optional()`装饰器。

- 这里 include `HTTP_OPTIONS`自定义token

```jsx
import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject('HTTP_OPTIONS') private httpClient: T) {}
}
```

### 基于属性的注入

上面的都是基于构造函数的注入，如果顶级的类需要依赖其他的 provider，那么可以使用 `@Inject()`装饰器

### Provider 注册

需要在module 里注册 provider，使得 nest 可以进行注入。那么其实 controller 就是我们的 provider 的 consumer。

## Module

模块也是一个类，但是它有 `@Module()`装饰器，这个装饰器可以提供 metadata，nest 用以组织应用的结构。

每个应用有至少一个模块，根模块。根模块是 nest 用于构建应用图的起点，`@Module()`构造器接收一个对象

- providers 他们会被 nest injector 实例化，在模块内共享
- controllers 定义一系列需要被实例化的 controller
- imports 导入一系列模块，里面有当前模块需要的 `proviers`
- exports 导出当前模块的 `providrs`的子集，

模块会默认会装入`providers`，This means that it's impossible to inject providers that are neither directly part of the current module nor exported from the imported modules.

我们把一些关联的 controller 和 service 放入一个模块，称之为 feature 模块。

### 共享模块

默认情况下，模块是单例的，所以是一个共享的模块，其他的模块导入 `CatsModule` 可以访问 `CatsService`，同时会和其他的模块分享这同一个实例。

导入的模块可以重复导出供其他模块再导入。

模块也可以依赖注入一个 provider，比如为了配置。但是模块类不能作为provider 注入其他模块，会导致循环引用。

```jsx
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private catsService: CatsService) {}
}
```

### 全局模块

在nestjs里，要使用模块的 providers 必须先导入模块。但是如果想定义一些全局可以使用的模块，(helper、数据库连接)，可以使用 `@Global()`。

### 动态模块

动态模块可以创建自定义的模块，可以动态地注册和配置 provider，会在后面详细介绍。

### 中间件

中间件是一个函数，在 router handler 之前被调用。它可以访问 request 和 response，和 express 的中间件类似，可以有下面的功能

- 可以执行任何代码
- 用于修改 request 和 response 对象
- 终止 request-response cycle
- 调用下一个中间件函数
- 如果当前中间件不需要终止 request-response cycle，那么它必须调用 `next()`方法把控制权交给下一个中间件

implement 自定义的 Nest 中间件如下，它也支持依赖注入，和 provider 和 controller 一样，中间件可以注入在当前模块有效的依赖。通过 contructor 实现。

```jsx
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
```

### 使用中间件

在 `@Module()`里没有配置中间件的地方，我们使用 `configure()`方法，包含中间件的模块必须 implement `NestModule` interface，注意配置方法可以是 async 的。

```jsx
import { Module, NestModule,RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats', method: RequestMethod.GET);
  }
}
```

- 我们也可以在 `forRoutes`方法里传入 method 来限制使用范围。
- 也可以在 `forRoutes` 里面配置 wildcards 的路由

### 中间件 consumer

`MiddlewareConsumer` 是一个 helper class，提供了一些内置的方法来管理中间件，可以让他们通过 fluent style chain 起来，apply 方法可以接收多个参数，指定多个中间件。

### exclude routes

```jsx
consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST },
    'cats/(.*)',
  )
  .forRoutes(CatsController);
```

### 函数式中间件

如果我们不用类定义中间件，而是用一个函数定义，那么也是可以的，在需要依赖的时候，建议使用函数式的中间件，它的用法是一样的。

```jsx
// 函数式中间件
export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};

// 多个中间件
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);

// 全局中间件
const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

中间件不能是泛型的，因为中间件无法获取 执行上下文。

## 异常过滤

Nest 有一个内置的异常 layer，用于处理没有捕获的错误。

如果出现的异常 不是 `HttpException` 或者继承自 `HttpException` 那么返回一个500的序列化的错误json。

在应用里，向客户端返回异常时，最好使用 `HttpException`

```jsx
// 如果要自定义响应data，可以向第一个参数传入 object
throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
```

### 自定义异常

可以自己实现一个异常类

```jsx
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
// 因为继承自 HttpException 所以使用时可以直接 
throw new ForbiddenException();
```

我们也可以完全自定义 异常 layer......

可以用于 sentry 提交错误，或者其他需求

### Pipes

pipes 是一个类，有 `@Injectable()`装饰器，应该 implement `PipeTransform` interface，使用场景有两种

1. 变化 input data 到希望到 output
2. 验证 input data 是否有效，无效时可以抛出异常

在这两种情况下，pipies 必须通过一个 controller router handler 来处理 arguments。Nest 会在一个方法执行前插入 pipe，在pipe里接收这个方法的参数，然后处理之后，再传递给该方法。

pipe 是在异常区域运行的，意味着一个 Pipe 抛出异常时，会被异常层捕获，所以pipe 后面的方法都不会执行

### 内置的 pipes

他们都是从 `@nestjs/common` 导出的: `ValidationPipe ParseIntPipe ParseBoolPipe ParseArrayPipe ParseUUIDPipe DefaultValuePipe` 

### `ValidationPipe`

```jsx
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}

// PipeTransform<T, R> 是一个泛型 interface，
// T 代表input value，R 代表 transform() 方法的返回类型
```

每个pipe 必须提供 `transform()` 方法，有两个参数，value、metadata，metadata 对象有这些属性。

```tsx
export interface ArgumentMetadata {
	// 表明 argument 是 @body() @query() 还是 @Param()
  type: 'body' | 'query' | 'param' | 'custom'; 
	// 提供参数的 metatype，比如 String
  metatype?: Type<unknown>;
	// 传递给 decorator 的 string，比如 @body('string')
  data?: string; 
}
```

我们定义一个pipe

```tsx
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
```

我们使用 pipes

```tsx
@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

### Class validator

`class-validator` 这是一个库，可以让我们使用基于装饰器的验证。

create-cat.dto.ts

```tsx
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}
```

然后创建一个 validationPipe class

```tsx
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
		// 把这些plain js 参数转化为对象类型后，才可以校验。
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
	
	// helper function, 负责让原生的js 类型通过
	// 因为这些 native js type 不能拥有关联的schemas，所以
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

这个 pipe 的 scope，可以是 method、controller、global，而且还可以是 param-scoped，对于一些特定的参数应用校验逻辑时会很有用

```tsx
@Post()
async create(
  @Body(new ValidationPipe()) createCatDto: CreateCatDto,
) {
  this.catsService.create(createCatDto);
}

// 
@UsePipes(new ValidationPipe()) // 立刻实例一个
@UsePipes(ValidationPipe) // 交给框架实例，enable 依赖注入

// 也可以注入全局
const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe());
```

### Guard

是一个类，使用 `@Injectable()`装饰器，同时 implement `CanActivate` interface

他们来决定一个请求是否该被这个路由处理

授权：有权限才可以访问指定路由，我们使用 `AuthGuard`，提取和验证token，来决定是否处理请求

auth.guard.ts

```tsx
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

guard 的scope也可以是 controller、method、global

```tsx
@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {}
```

## Interceptors

是一个类，有 `@Injectable()`装饰器，同时应该实现 `NestInterceptor` interface。

interceptors 拥有一系列的有用能力，主要被 AOP(Aspect Oirented Programming) 技术所启发，可以实现下面的能力

- 在一个方法执行前后，绑定额外的逻辑
- 转换一个函数的返回值
- 转换一个函数抛出的异常
- 继承基础的函数行为
- 在一些场景下，完全 override 一个函数

每个 interceptor 里面都应该 implement `intercept()`方法，接收两个参数，第一个是一个 `ExcutionContext`实例，和 guards 里面的一样，`ExcutionContext`继承自`ArgumentsHost`，在异常过滤章节见过它，第二个参数是一个 `CallHanlder`

### execution context

通过 extend `ArgumentsHost`，`ExecutionContext`添加一些 helper 方法提供当前执行进程的额外细节。这些细节可以帮助构建更 generic 的 interceptors，使得可以该 interceptor 可以在一系列的 controllers，methods 和 execution context 里工作

### call handler

`CallHandler`接口 implements `handle()`方法，可以在 interceptor 的 里面执行 router handler，如果没有这个方法，路由handler 就不会执行。

这个方法需要在 `interccept()` 内部调用，意味着内部可以访问请求和响应流。

响应流？那我们怎么访问在路由handler处理后的响应流。原理 `Handler()`方法返回的是一个 `Observable`，我们可以使用 RxJS 操作符来操作响应。

在 AOP 术语里面，调用 route handler(比如 `handle()`)被称为 Pointcut，表示在这里是插入逻辑的 point.

举个例子，对于一个 `POST /cats` 方法，目的是controller 里面的 `create()`方法，那么如果一个 interceptor 没有调用 `handle()`那么 create 就不会执行。一旦 handle() 调用发生，create 也会被触发，之后如果通过 `Observable`接收到了响应流，那么就可以最后的结果就会返回给 caller。

### 创建

我们可以使用一个 interceptor 来记录用户行为(比如，存储用户调用，异步触发事件，计算时间戳)，如下 logging.interceptor.ts

```tsx
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

- interceptor 和 controller、provider、guard 一样，都可以通过构造函数进行依赖注入
- **`handle()`** 方法返回的是一个 ****`Observable` ，所以我们就可以使用各种操作符，比如上面的 `tap()`操作，在 observable stream 终止时执行一个匿名的 log 函数，但是却不影响到 response cycle
- `handle()`让我们可以转换 response，比如使用 `map()` 操作符

    ```tsx
    // ExcludeNullInterceptor
    .pipe(map(value => value === null ? '' : value ));

    // ErrorsInterceptor 可以 override 抛出的异常
    catchError(err => throwError(new BadGatewayException()))
    ```

- CacheInterceptor 使用缓存来返回响应，也可以利用 Reflector 创建自定义的装饰器，是 generic solution

    ```tsx
    export class CacheInterceptor implements NestInterceptor {
      intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const isCached = true;
        if (isCached) {
    			// 在这里直接返回缓存
          return of([]);
        }
        return next.handle();
      }
    }
    ```

- 另一个场景，请求超过5s，我们返回异常

    ```tsx
    return next.handle().pipe(
          timeout(5000),
          catchError(err => {
            if (err instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(err);
          }),
        );
    ```

### 绑定

为了设置 interceptor，我们使用 `@useInterceptors()` 装饰器，它的 scope 可以是 controller-scoped，method-scoped，global-scoped。

```tsx
// controller-scoped
@UseInterceptors(LoggingInterceptor) // 同样可以 new 创建一个实例传进去
export class CatsController {}
// global-scoped
const app = await NestFactory.create(AppModule);
app.useGlobalInterceptors(new LoggingInterceptor());

// 如果全局注册就无法使用依赖注入了，所以我们可以在模块里来
// 但是注意虽然可以使用依赖注入了，但模块依然注册到全局去的
// 我们通常在某个定义 interceptor 的地方，进行这个操作
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
```

### 装饰器

ES2016 装饰器是一个表达式，返回一个函数，可以接收一个目标、名称、属性描述符作为参数。通过一个 `@`符号+装饰器名称来使用，放在想要装饰的上面，装饰器可以是一个类或者是一个属性。

### 参数装饰器

Nest 提供一些有用的参数装饰器，可以用于 Http router handlers，

`@Request() @Response @Next() @Session() @Param(param?:string) @Body(param?:string) @Query(param?string) @Header(param?:string) @Ip()`

我们可以自定义一个 user 装饰器，类似 @Body

```tsx
// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user && user[data] : user;
  },
);

// 使用
@Get()
async findOne(@User('firstName') firstName: string) {
  console.log(`Hello ${firstName}`);
}

// 我们也可以直接在装饰器上使用 pipe
@Get()
async findOne(@User(new ValidationPipe()) user: UserEntity) {
  console.log(user);
}
```

### 装饰器组合

Nest 提供一个 helper 方法，来组合多种装饰器

```tsx
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}

// 然后使用
@Get('users')
@Auth('admin')
findAllUsers() {}
```