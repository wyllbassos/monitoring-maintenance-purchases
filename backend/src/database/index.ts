import { createConnection, getConnectionOptions, Connection } from 'typeorm';

export default async (name = 'default'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const connection = await createConnection(
    Object.assign(defaultOptions, {
      name,
      database: defaultOptions.database,
    }),
  );

  return connection;
};
