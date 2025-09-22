import { Test, TestingModule } from "@nestjs/testing";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

describe("UserController", () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [
				{
					provide: UserService,
					useValue: {
						getUser: jest.fn().mockReturnValue({}),
					},
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it("should be defined", async () => {
		const controller = new UserController(service);
		await controller.getUser(1, "xxx-xxx-xxx-xxx");

		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(service.getUser).toHaveBeenCalledTimes(1);
	});
});
