### Exercicio 1

a) A resposta eh um array com 2 arrays dentro.
O primeiro array contem objetos RowDataPacket correspondentes a cada linha encontrada pela query
O segundo contem objetos FieldPacket, que descrevem meta-informacoes como nome do db, tabela e coluna.

b)

```ts
async function getActorByName(name: string): Promise<any> {
  const res = await connection.raw(`
      SELECT * FROM actor WHERE name = '${name}'
    `);
  console.log(res[0]);
  return res[0];
}
```

c)

```ts
async function countActors(gender: string): Promise<any> {
  const res = await connection.raw(`
    SELECT COUNT(*) as quantidade, gender
    FROM actor
    WHERE gender = '${gender}'
`);
  console.log(res[0]);
  return res[0];
}
```

---

### Exercicio 2

a)

```ts
async function updateSalary(id: string, salary: number): Promise<void> {
  await connection("actor").where({ id }).update({ salary });
}
```

b)

```ts
async function deleteActor(id: string): Promise<any> {
  await connection("actor").where({ id }).delete();
}
```

c)

```ts
async function averageSalary(gender: string): Promise<any> {
  const res = await connection("actor")
    .where({ gender })
    .select("gender")
    .avg("salary as Media salarial");
  console.log(res);
  return res;
}
```

---

### Exercicio 3

a) Essa eh uma caracteristica do Request do express.ts, que cria um objeto params com uma chave com o mesmo nome que esta na route.
b) Eles enviam uma resposta com o status e conteudo definido nessas linhas.
c)

```ts
app.get("/actor", async (req: Request, res: Response) => {
  try {
    const count = await countActors(req.query.gender as string);
    res.status(200).send(count);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});
```

---

### Exercicio 4

a)

```ts
app.post("/actor", async (req: Request, res: Response) => {
  try {
    await updateSalary(req.body.id, req.body.salary);
    res.status(200).send({
      message: "Success",
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});
```

b)

```ts
app.delete("/actor/:id", async (req: Request, res: Response) => {
  try {
    await deleteActor(req.params.id);
    res.status(200).send({
      message: "Success",
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});
```

---

### Exercicio 5

a)

```ts
async function createMovie(
  id: string,
  name: string,
  synopsis: string,
  launch_date: Date,
  playing_limit_date: Date
): Promise<void> {
  await connection("movie").insert({
    id,
    name,
    synopsis,
    launch_date,
    playing_limit_date,
  });
}
```

```ts
app.post("/movie", async (req: Request, res: Response) => {
  try {
    await createMovie(
      req.body.id,
      req.body.name,
      req.body.synopsis,
      req.body.launch_date,
      req.body.playing_limit_date
    );

    res.status(200).send({
      message: "Success",
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});
```

---

### Exercicio 6

a)

```ts
async function getMovies(): Promise<any> {
  const res = await connection("movie").limit(15);
  return res;
}
```

```ts
app.get("/movie", async (req: Request, res: Response) => {
  try {
    const movies = await getMovies();
    res.status(200).send(movies);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});
```

---

### Exercicio 7

```ts
async function searchMovies(query: string): Promise<any> {
  const res = await connection("movie")
    .where("name", "LIKE", `%${query}%`)
    .orWhere("synopsis", "LIKE", `%${query}%`)
    .orderBy("launch_date", "asc");
  return res;
}
```

```ts
app.get("/movie/search", async (req: Request, res: Response) => {
  try {
    const movies = await searchMovies(req.query.query as string);
    res.status(200).send(movies);
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});
```
