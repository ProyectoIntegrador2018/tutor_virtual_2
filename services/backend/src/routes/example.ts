import { Router } from "express";
import ExampleController from "../controllers/ExampleController";

const router = Router();

router.get("/example", async (req, res) => {
  // Construct a controller and specify which action method
  // should be use to resolve this particular endpoint.
  const controller = new ExampleController({
    req,
    res,
    // The action param must match a method in ExampleController.
    action: "myAction",
  });

  // This is the only public method that should be called
  // from any given controller to start the request-response cycle.
  await controller.handleRequest();
});

export { router };
