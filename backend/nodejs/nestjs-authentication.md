# Nestjs Authentication

### 实现 Passport JWT

需求是：只有有效的 JWT 才可以到达指定终点。我们创建一个 `jwt.strategy.ts`

```tsx
import { ExtractJwt, Strategy } from 'password-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstans } from './constans';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			// 此处是特意设置的，默认即是false，如果token无效会返回 401
			ignoreExpiration: false,
			secretOrKey: jwtConstans.secreat,
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, username: payload.username };
	}
}
```

注册 jwt.strategy 作为一个 provider

```tsx
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

定义一个 `JwtAuthGuard` 类， `jwt-auth.guard.ts`

```tsx
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

实现保护路由和 jwt strategy guards，

```tsx
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
	constructor(pricate authService: AuthService) {}

	@useGuards(LocalAuthGuard)
	@Post('auth/login');
	async login(@Request() res) {
		return this.authService.login(req.user);
	}
	
	@useGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user
	}
}
```