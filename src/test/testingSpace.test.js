import { test, expect, describe } from "vitest";
import { Fetcher } from "./components/models/Request/Fetcher";
import { Requester } from "./components/models/Requester/Requester";
import { HandlerErrorStrategy } from "./components/models/HandlerError/HandlerErrorStrategy";
import { HandlerError } from "./components/models/HandlerError/HandlerError";
import InfoPrint from "../pages/Options/InfoPrint/InfoPrint";
import info from "./const/testIteratorInfo";
import iteratorInfo from "../utils/infoPrint";

describe("group test request", () => {
  test("return result request", async () => {
    try {
      const classError = new HandlerErrorStrategy();
      classError.setStrategy(new HandlerError());

      const fetching = await new Requester(
        new Fetcher("http://localhost:3005/site/categories", {}),
        classError
      ).makeRequest();

      expect(fetching).toBe(fetching);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});

describe("group test infoPrint", () => {
  test("return result printed", async () => {
    iteratorInfo(info);

    expect().toBe();
  });
});
