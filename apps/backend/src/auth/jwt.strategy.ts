import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

import type { JwtPayload } from "@/types/jwtPayload";
import type { RequestUser } from "@/types/requestUser";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET as string,
		});
	}

	validate(payload: JwtPayload): RequestUser {
		const id = payload.user_id;
		return {
			email: payload.sub,
			name: payload.username,
			id,
		};
	}
}
