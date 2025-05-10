import { DataSource, DataSourceOptions } from 'typeorm';
import ormconfig = require('./ormconfig');

export default new DataSource(ormconfig[0] as DataSourceOptions);
