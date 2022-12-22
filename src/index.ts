import * as dotenv from 'dotenv'
import { startServer } from './modules/http.js'

dotenv.config()

const {HOST, PORT, BACKLOG} = process.env

startServer(HOST, Number(PORT), Number(BACKLOG))