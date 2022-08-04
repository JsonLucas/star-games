import app from './utils/app';
import { port } from './utils/envConfig';

app.listen(port, () => { console.log(`server running at ${port}`); });