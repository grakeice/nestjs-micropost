import { Test, TestingModule } from "@nestjs/testing";

import { PostController } from "./post.controller";
import { PostService } from "./post.service";

describe("PostController", () => {
	let service: PostService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PostController],
			providers: [
				{
					provide: PostService,
					useValue: {
						getList: jest.fn().mockReturnValue({}),
					},
				},
			],
		}).compile();

		service = module.get<PostService>(PostService);
	});

	it("should be defined", async () => {
		const controller = new PostController(service);
		await controller.getList("xxx-xxx-xxx-xxx", 1, 1);

		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(service.getList).toHaveBeenCalledTimes(1);
	});
});
