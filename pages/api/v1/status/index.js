import database from "../../../../infra/database.js";

export default async function handler(req, res) {
  const result = await database.query("SELECT 1 + 1 AS sum;");

  res.status(200).json({ message: "Alunos do curso.dev são acima da média" });
}
