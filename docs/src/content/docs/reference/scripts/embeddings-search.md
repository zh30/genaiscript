---
title: Embeddings Search
sidebar:
    order: 10
---

The `retreival.search` indexes the input files using [embeddings](https://platform.openai.com/docs/guides/embeddings) into a vector database that can be used for similarity search. This is commonly referred as Retreival Augmented Generation (RAG).

```js
const { files, fragments } = await retreival.search("keyword", env.files)
```

The returned `files` object contains the file with
concatenated embeddings, and the `fragments` object contains each indiviual file fragment.

You can use the result of `files` in the `def` function.

```js
const { files } = await retreival.search("keyword", env.files)
def("FILE", files)
```

## Embeddings token

The computation of embeddings is done through the
LLM APIs using the same authorization token as the LLM API.

## Installation requirements

The retreival uses [LLamaindex TS](https://ts.llamaindex.ai/) for indexing and searching.
The `llamaindex` package will be automatically installed.