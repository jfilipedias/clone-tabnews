import database from "infra/database.js";

export default async function handler(req, res) {
  const updatedAt = new Date().toISOString();

  const serverVersionResult = await database.query("SHOW server_version;");
  const serverVersionValue = serverVersionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnectionsValue = maxConnectionsResult.rows[0].max_connections;

  const openedConnectionsResult = await database.query(
    "SELECT COUNT (*) AS opened_connections from pg_stat_activity WHERE state = 'active';",
  );
  const openedConnectionsValue =
    openedConnectionsResult.rows[0].opened_connections;

  const apiStatus = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: serverVersionValue,
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: parseInt(openedConnectionsValue),
      },
    },
  };

  res.status(200).json(apiStatus);
}
