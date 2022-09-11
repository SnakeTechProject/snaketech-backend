import { app } from './config/server';
import { port } from './config/vars';

app.listen(port, () => {
  console.log(`server listening at port: ${port}`);
});
