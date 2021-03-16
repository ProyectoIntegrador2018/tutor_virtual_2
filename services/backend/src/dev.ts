import { main } from "./app";
import { logger } from "./utils/logger";

main()
  .then((app) => {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      logger.info(`Server is now ready for http connections on port ${port}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
