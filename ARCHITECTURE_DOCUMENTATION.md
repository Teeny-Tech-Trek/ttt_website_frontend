# ARCHITECTURE DOCUMENTATION

Professional engineering architecture document for the Teeny Tech Trek chatbot backend.

--------------------------------------------------
## TABLE OF CONTENTS

- [1. System Overview](#1-system-overview)
- [1.1 Purpose of the chatbot](#11-purpose-of-the-chatbot)
- [1.2 Architectural shape](#12-architectural-shape)
- [1.3 Core technologies used](#13-core-technologies-used)
- [1.4 How RAG is implemented here](#14-how-rag-is-implemented-here)
- [1.5 How vector search, knowledge graph, and LLM reasoning are combined](#15-how-vector-search-knowledge-graph-and-llm-reasoning-are-combined)
- [1.6 System behavior philosophy](#16-system-behavior-philosophy)
- [2. Main Components](#2-main-components)
- [2.1 API Layer](#21-api-layer)
- [2.2 Query Router and Runtime Orchestrator](#22-query-router-and-runtime-orchestrator)
- [2.3 Flow Engine](#23-flow-engine)
- [2.4 Structured Query Handler](#24-structured-query-handler)
- [2.5 RAG Service](#25-rag-service)
- [2.6 Embedding System](#26-embedding-system)
- [2.7 Vector Search and FAISS Layer](#27-vector-search-and-faiss-layer)
- [2.8 Hybrid Retrieval Layer](#28-hybrid-retrieval-layer)
- [2.9 Entity Detection](#29-entity-detection)
- [2.10 Knowledge Graph Runtime Layer](#210-knowledge-graph-runtime-layer)
- [2.11 Context Builder](#211-context-builder)
- [2.12 LLM Integration Layer](#212-llm-integration-layer)
- [2.13 Knowledge Management Service](#213-knowledge-management-service)
- [2.14 Cache Layer](#214-cache-layer)
- [2.15 MongoDB Persistence Layer](#215-mongodb-persistence-layer)
- [2.16 Data Models and Request/Response Schemas](#216-data-models-and-requestresponse-schemas)
- [2.17 Incremental Indexing Worker](#217-incremental-indexing-worker)
- [2.18 Full Index Build Pipeline](#218-full-index-build-pipeline)
- [2.19 Graph-Aware Chunking Pipeline](#219-graph-aware-chunking-pipeline)
- [2.20 Knowledge Graph Seed Pipeline](#220-knowledge-graph-seed-pipeline)
- [2.21 Knowledge Ingestion and Seeding](#221-knowledge-ingestion-and-seeding)
- [2.22 Startup Initialization Logic](#222-startup-initialization-logic)
- [3. File Guide (File Intelligence)](#3-file-guide-file-intelligence)
- [3.1 FILE: `app/main.py`](#31-file-appmainpy)
- [3.2 FILE: `app/router.py`](#32-file-approuterpy)
- [3.3 FILE: `app/config.py`](#33-file-appconfigpy)
- [3.4 FILE: `app/models/schemas.py`](#34-file-appmodelsschemaspy)
- [3.5 FILE: `app/models/mongo.py`](#35-file-appmodelsmongopy)
- [3.6 FILE: `app/pipeline.py`](#36-file-apppipelinepy)
- [3.7 FILE: `app/flow_engine/engine.py`](#37-file-appflowengineenginepy)
- [3.8 FILE: `app/flow_engine/state_store.py`](#38-file-appflowenginestatestorepy)
- [3.9 FILE: `app/flow_engine/flow_config.json`](#39-file-appflowengineflowconfigjson)
- [3.10 FILE: `app/structured_handler/handler.py`](#310-file-appstructuredhandlerhandlerpy)
- [3.11 FILE: `app/knowledge/service.py`](#311-file-appknowledgeservicepy)
- [3.12 FILE: `app/cache/redis_client.py`](#312-file-appcacheredisclientpy)
- [3.13 FILE: `app/cache/cache_service.py`](#313-file-appcachecacheservicepy)
- [3.14 FILE: `app/rag/embeddings.py`](#314-file-appragembeddingspy)
- [3.15 FILE: `app/rag/vector_store.py`](#315-file-appragvectorstorepy)
- [3.16 FILE: `app/rag/context_builder.py`](#316-file-appragcontextbuilderpy)
- [3.17 FILE: `app/rag/service.py`](#317-file-appragservicepy)
- [3.18 FILE: `app/hybrid/hybrid_retriever.py`](#318-file-apphybridhybridretrieverpy)
- [3.19 FILE: `app/kg/entity_detection.py`](#319-file-appkgentitydetectionpy)
- [3.20 FILE: `app/kg/kg_queries.py`](#320-file-appkgkgqueriespy)
- [3.21 FILE: `app/kg/kg_mapper.py`](#321-file-appkgkgmapperpy)
- [3.22 FILE: `app/kg/kg_service.py`](#322-file-appkgkgservicepy)
- [3.23 FILE: `app/llm_client/client.py`](#323-file-appllmclientclientpy)
- [3.24 FILE: `app/utils/text.py`](#324-file-apputilstextpy)
- [3.25 FILE: `app/utils/metrics.py`](#325-file-apputilsmetricspy)
- [3.26 FILE: `app/utils/tracking.py`](#326-file-apputilstrackingpy)
- [3.27 FILE: `app/utils/logging.py`](#327-file-apputilsloggingpy)
- [3.28 FILE: `scripts/seed_mongo.py`](#328-file-scriptsseedmongopy)
- [3.29 FILE: `scripts/ingest_frontend_content.py`](#329-file-scriptsingestfrontendcontentpy)
- [3.30 FILE: `scripts/graph_aware_chunking.py`](#330-file-scriptsgraphawarechunkingpy)
- [3.31 FILE: `scripts/build_knowledge_graph.py`](#331-file-scriptsbuildknowledgegraphpy)
- [3.32 FILE: `scripts/build_faiss_index.py`](#332-file-scriptsbuildfaissindexpy)
- [3.33 FILE: `scripts/embedding_worker.py`](#333-file-scriptsembeddingworkerpy)
- [3.34 FILE: `scripts/crawl_site.py`](#334-file-scriptscrawlsitepy)
- [3.35 FILE: `scripts/run_api.py`](#335-file-scriptsrunapipy)
- [3.36 FILE: `scripts/seed_all_knowledge_bases.py`](#336-file-scriptsseedallknowledgebasespy)
- [3.37 FILE: `data/seed/mongo_seed.json`](#337-file-dataseedmongoseedjson)
- [3.38 FILE: `data/knowledge_architecture/chunk_classification.json`](#338-file-dataknowledgearchitecturechunkclassificationjson)
- [3.39 FILE: `data/knowledge_architecture/graph_seed.json`](#339-file-dataknowledgearchitecturegraphseedjson)
- [3.40 FILE: `data/faiss/index.faiss`](#340-file-datafaissindexfaiss)
- [3.41 FILE: `deploy/systemd/ttt-rag-api.service`](#341-file-deploysystemdttt-rag-apiservice)
- [3.42 FILE: `deploy/systemd/ttt-rag-embedding-worker.service`](#342-file-deploysystemdttt-rag-embedding-workerservice)
- [3.43 FILE: `deploy/nginx/ttt-rag-chatbot.conf`](#343-file-deploynginxttt-rag-chatbotconf)
- [3.44 FILE: `.env.example`](#344-file-envexample)
- [4. User Query Flow](#4-user-query-flow)
- [4.1 Full pipeline](#41-full-pipeline)
- [4.2 Step-by-step explanation](#42-step-by-step-explanation)
- [5. Indexing System](#5-indexing-system)
- [5.1 How knowledge enters the system](#51-how-knowledge-enters-the-system)
- [5.2 Where chunking happens](#52-where-chunking-happens)
- [5.3 Where graph-vs-vector separation happens](#53-where-graph-vs-vector-separation-happens)
- [5.4 Graph-aware chunking](#54-graph-aware-chunking)
- [5.5 How FAISS is built](#55-how-faiss-is-built)
- [5.6 Where vectors are stored](#56-where-vectors-are-stored)
- [5.7 Where document mappings are stored](#57-where-document-mappings-are-stored)
- [5.8 How incremental indexing works](#58-how-incremental-indexing-works)
- [5.9 Which worker processes pending documents](#59-which-worker-processes-pending-documents)
- [5.10 Indexing diagrams](#510-indexing-diagrams)
- [6. Knowledge Graph](#6-knowledge-graph)
- [6.1 How the graph is structured](#61-how-the-graph-is-structured)
- [6.2 Example node categories visible in artifacts and code](#62-example-node-categories-visible-in-artifacts-and-code)
- [6.3 Example relationships](#63-example-relationships)
- [6.4 Which files interact with Neo4j](#64-which-files-interact-with-neo4j)
- [6.5 How KG results are merged with vector search](#65-how-kg-results-are-merged-with-vector-search)
- [6.6 Runtime KG query logic](#66-runtime-kg-query-logic)
- [7. Retrieval System](#7-retrieval-system)
- [7.1 Hybrid retrieval pipeline](#71-hybrid-retrieval-pipeline)
- [7.2 Vector search behavior](#72-vector-search-behavior)
- [7.3 Knowledge graph retrieval behavior](#73-knowledge-graph-retrieval-behavior)
- [7.4 Flow engine decisions in retrieval](#74-flow-engine-decisions-in-retrieval)
- [7.5 How the system decides when to use each source](#75-how-the-system-decides-when-to-use-each-source)
- [8. Databases and Storage](#8-databases-and-storage)
- [8.1 MongoDB](#81-mongodb)
- [8.2 Neo4j](#82-neo4j)
- [8.3 FAISS](#83-faiss)
- [8.4 Redis](#84-redis)
- [8.5 Storage responsibility summary](#85-storage-responsibility-summary)
- [9. Server Startup](#9-server-startup)
- [9.1 API server startup flow](#91-api-server-startup-flow)
- [9.2 What gets initialized at startup](#92-what-gets-initialized-at-startup)
- [9.3 What is not initialized until needed](#93-what-is-not-initialized-until-needed)
- [9.4 Shutdown flow](#94-shutdown-flow)
- [10. Architecture Diagrams](#10-architecture-diagrams)
- [10.1 High Level System Architecture](#101-high-level-system-architecture)
- [10.2 RAG Retrieval Pipeline](#102-rag-retrieval-pipeline)
- [10.3 Indexing Pipeline](#103-indexing-pipeline)
- [10.4 Query Processing Pipeline](#104-query-processing-pipeline)
- [10.5 Data Storage Architecture](#105-data-storage-architecture)
- [11. Runtime Rules](#11-runtime-rules)
- [12. Book Index](#12-book-index)

--------------------------------------------------

## 1. System Overview

Simple explanation:
This section explains what the chatbot is for, how the main parts fit together, and how retrieval, graph lookup, and LLM reasoning work together in one system.

--------------------------------------------------

## 1.1 Purpose of the chatbot

The system is a production FastAPI backend for the Teeny Tech Trek website chatbot. Its job is to answer user questions about the business, services, pricing, consultation options, contact information, FAQs, industries served, integrations, and AI implementation topics.

The chatbot is not a single-model freeform assistant. It is intentionally layered so that the cheapest and most deterministic answer source is attempted first, and the more expensive generative layer is used only when necessary.

The system supports five broad response modes:

1. `cache`
   Replays previously computed answers for repeat text queries.
2. `flow`
   Handles deterministic menu and guided-navigation interactions.
3. `structured`
   Handles direct business-profile style questions such as contact, pricing, login, consultation, blogs, and FAQ requests.
4. `rag`
   Uses retrieval over vector knowledge plus optional knowledge graph facts.
5. `fallback`
   Returns guarded responses when the system cannot ground an answer in the knowledge base or when dependencies are unavailable.

#

--------------------------------------------------

--------------------------------------------------

## 1.2 Architectural shape

At a high level, the system has three knowledge layers and one orchestration layer:

1. Deterministic flow knowledge
   Stored as guided flow configuration and used for menu-style navigation.
2. Structured business knowledge
   Stored in MongoDB and used for fast direct answers.
3. Retrieval knowledge
   Split across FAISS vector search and Neo4j knowledge graph facts.
4. Chat pipeline orchestration
   Controls routing, fallback behavior, answer shaping, caching, and optional reasoning.

#

--------------------------------------------------

--------------------------------------------------

## 1.3 Core technologies used

The codebase directly uses or is architected around the following technologies:

- FastAPI for the HTTP API and lifecycle hooks.
- Uvicorn for ASGI serving.
- MongoDB for the editable knowledge source, guided-flow document, compatibility collections, vector mapping metadata, and usage metrics.
- Redis for caching, lightweight session state, and worker locking.
- FAISS for semantic vector search over knowledge chunks.
- Neo4j for structured relationship facts and graph traversal.
- SentenceTransformers for embeddings when local model loading is enabled.
- Deterministic fallback embeddings when the sentence-transformer model is disabled or unavailable.
- Anthropic-compatible HTTP API for LLM completions and streaming.
- Playwright and BeautifulSoup in the crawler ingestion script.
- Prometheus client for metrics exposure.

#

--------------------------------------------------

--------------------------------------------------

## 1.4 How RAG is implemented here

RAG in this system is hybrid by design.

The retrieval path is:

1. Embed the user query.
2. Search FAISS for semantically similar knowledge chunks.
3. Pull knowledge item metadata from MongoDB.
4. Keyword-score and rerank the retrieved candidates.
5. Apply intent-aware category filtering and penalties.
6. Use MMR to keep a small but diverse set of chunks.
7. Detect entities in the user query.
8. If the query is graph-relevant, query Neo4j for exact facts.
9. Merge graph facts and vector chunks.
10. Build LLM context with graph facts first and documentation second.
11. Either:
   - answer deterministically from KG facts,
   - synthesize a local fallback answer from retrieved text,
   - or call the LLM for concise grounded synthesis.

This means the system is not â€œvector only.â€ It is a retrieval stack that can answer from:

- exact graph relationships,
- semantic text chunks,
- or both together.

#

--------------------------------------------------

--------------------------------------------------

## 1.5 How vector search, knowledge graph, and LLM reasoning are combined

The combination strategy is explicit:

- Vector search provides semantic coverage.
  It is best for explanations, longer descriptions, policies, narratives, and general company/service text.

- Knowledge graph provides exact relationship facts.
  It is best for integrations, capabilities, supported platforms, tools used, industries served, service relationships, and other atomic facts.

- LLM reasoning is optional and gated.
  It is not the first layer. It is used only after retrieval has already produced grounded context, or in a fallback reasoning path when RAG was weak and the system decides a more interpretive explanation is warranted.

The code explicitly tells the model to treat KG facts as the primary source of truth and documentation as secondary explanatory material.

#

--------------------------------------------------

--------------------------------------------------

## 1.6 System behavior philosophy

The architecture is designed around these principles:

- Deterministic answers before generative answers.
- Grounding before generation.
- Exact facts before semantic explanation.
- Safe fallback before hallucination.
- UI-friendly response shaping after internal retrieval.
- Operational resilience through caching and graceful degradation.

---

--------------------------------------------------

## 2. Main Components

Simple explanation:
This section breaks the system into its main building blocks so a developer can quickly see where each responsibility lives.

Navigation guide:
2.1 API Layer
2.2 Query Router and Runtime Orchestrator
2.3 Flow Engine
2.4 Structured Query Handler
2.5 RAG Service
2.6 Embedding System
2.7 Vector Search and FAISS Layer
2.8 Hybrid Retrieval Layer
2.9 Entity Detection
2.10 Knowledge Graph Runtime Layer
2.11 Context Builder
2.12 LLM Integration Layer
2.13 Knowledge Management Service
2.14 Cache Layer
2.15 MongoDB Persistence Layer
2.16 Data Models and Request/Response Schemas
2.17 Incremental Indexing Worker
2.18 Full Index Build Pipeline
2.19 Graph-Aware Chunking Pipeline
2.20 Knowledge Graph Seed Pipeline
2.21 Knowledge Ingestion and Seeding
2.22 Startup Initialization Logic

--------------------------------------------------

## 2.1 API Layer

What it does:
Accepts HTTP requests, exposes chat and admin endpoints, returns JSON or SSE, and exposes health and metrics endpoints.

Why it exists:
It is the network boundary for the backend and the entry point for frontend and ops tooling.

Files:
- `app/main.py`
- `app/router.py`
- `app/models/schemas.py`

Important functions:
- `app.main.health()`
- `app.main.metrics()`
- `app.main.startup()`
- `app.main.shutdown()`
- `app.router.chat_endpoint()`
- `app.router.chat_endpoint_legacy()`
- `app.router.get_guided_knowledge()`
- `app.router.upsert_guided_knowledge()`
- `app.router.get_api_knowledge()`
- `app.router.upsert_api_knowledge()`

Interacts with:
- Chat pipeline controller
- Knowledge service
- Redis
- MongoDB
- FAISS store
- Flow engine
- KG warmup
- Embedding warmup

#

--------------------------------------------------

--------------------------------------------------

## 2.2 Query Router and Runtime Orchestrator

What it does:
Routes each validated chat request through cache, flow engine, structured handler, RAG, and optional reasoning.

Why it exists:
The chatbot is multi-layered; a single orchestrator is needed to preserve consistent ordering, fallbacks, formatting, and usage tracking.

Files:
- `app/pipeline.py`

Important functions:
- `ChatPipelineController.run()`
- `_detect_intent()`
- `_finalize_response_payload()`
- `_build_reasoning_messages()`
- `_rag_confident_enough()`
- `_should_use_reasoning_layer()`

Interacts with:
- Cache service
- Flow engine
- Structured handler
- RAG service
- LLM client
- Mongo metrics collection
- Redis-backed session state

#

--------------------------------------------------

--------------------------------------------------

## 2.3 Flow Engine

What it does:
Provides deterministic guided menus and button-driven conversational navigation.

Why it exists:
Many website chatbot interactions are menu-like and should not consume retrieval or LLM resources.

Files:
- `app/flow_engine/engine.py`
- `app/flow_engine/state_store.py`
- `app/flow_engine/flow_config.json`

Important functions:
- `GuidedFlowEngine.warmup()`
- `GuidedFlowEngine.process()`
- `GuidedFlowEngine._load_config()`
- `GuidedFlowEngine._build_response()`
- `FlowStateStore.get_state()`
- `FlowStateStore.set_state()`
- `FlowStateStore.clear_state()`

Interacts with:
- Redis for session state
- MongoDB for dynamic flow document
- Pipeline controller

#

--------------------------------------------------

--------------------------------------------------

## 2.4 Structured Query Handler

What it does:
Answers direct deterministic business requests such as login help, contact details, consultation info, pricing, blogs, and FAQ-style prompts.

Why it exists:
These answers are simpler, cheaper, and safer than running retrieval and generation.

Files:
- `app/structured_handler/handler.py`

Important functions:
- `StructuredQueryHandler.handle()`
- `_knowledge_doc()`
- `_is_login_intent()`
- `_is_contact_intent()`
- `_is_pricing_intent()`
- `_is_consultation_intent()`
- `_is_blog_intent()`
- `_is_faq_intent()`

Interacts with:
- MongoDB `chatbot_api_knowledge`
- Pipeline controller

#

--------------------------------------------------

--------------------------------------------------

## 2.5 RAG Service

What it does:
Owns embedding, FAISS search, keyword scoring, intent-aware reranking, MMR selection, hybrid retrieval, prompt building, deterministic hybrid answers, and streaming fallback synthesis.

Why it exists:
This is the retrieval-heavy core that turns stored knowledge into grounded answers.

Files:
- `app/rag/service.py`

Important functions:
- `RAGService.run()`
- `_keyword_scores()`
- `_infer_item_category()`
- `_filter_by_intent()`
- `_filter_text_by_intent()`
- `_apply_intent_category_penalty()`
- `_mmr_select()`
- `_build_hybrid_router_decision()`
- `_synthesize_hybrid_answer()`
- `_build_synthesis_messages()`
- `_enforce_answer_shape()`

Interacts with:
- Embeddings
- FAISS store
- MongoDB knowledge document
- Hybrid retriever
- Context builder
- LLM client
- Pipeline controller

#

--------------------------------------------------

--------------------------------------------------

## 2.6 Embedding System

What it does:
Converts text into normalized vectors for FAISS indexing and retrieval.

Why it exists:
Vector retrieval requires a consistent embedding space.

Files:
- `app/rag/embeddings.py`

Important functions:
- `_get_model()`
- `_fallback_embedding()`
- `embed_text()`
- `warmup_embeddings()`

Interacts with:
- RAG service
- Embedding worker
- FAISS build script
- FastAPI startup

#

--------------------------------------------------

--------------------------------------------------

## 2.7 Vector Search and FAISS Layer

What it does:
Loads and persists the FAISS index, stores in-memory vector-to-document mappings, performs nearest-neighbor search, and appends new vectors.

Why it exists:
FAISS is the runtime semantic retrieval engine.

Files:
- `app/rag/vector_store.py`

Important functions:
- `FaissStore.warmup()`
- `FaissStore.load()`
- `FaissStore._load_vector_mapping()`
- `FaissStore.validate_integrity()`
- `FaissStore.persist()`
- `FaissStore.add_vectors()`
- `FaissStore.deactivate_doc_ids()`
- `FaissStore.search()`
- `FaissStore.get_doc_ref()`

Interacts with:
- MongoDB `faiss_vector_map`
- RAG service
- Embedding worker
- FAISS rebuild script
- Startup health checks

#

--------------------------------------------------

--------------------------------------------------

## 2.8 Hybrid Retrieval Layer

What it does:
Merges vector chunks with KG facts and returns one combined retrieval result.

Why it exists:
The chatbot needs both exact graph facts and semantic text in one retrieval output.

Files:
- `app/hybrid/hybrid_retriever.py`

Important functions:
- `HybridRetriever.retrieve()`
- `_cache_key()`
- `_dedupe_texts()`
- `_combined_context()`
- `_confidence()`

Interacts with:
- Entity detection
- KG service
- Cache service
- RAG service

#

--------------------------------------------------

--------------------------------------------------

## 2.9 Entity Detection

What it does:
Extracts graph-relevant entities and infers a lightweight retrieval intent from a query.

Why it exists:
KG lookups should only run when the query likely refers to services, platforms, tools, or graph-like relationships.

Files:
- `app/kg/entity_detection.py`

Important functions:
- `detect_entities()`
- `detect_entity_list()`
- `_detect_lexical_entities()`
- `_detect_spacy_entities()`
- `_infer_intent()`
- `_dedupe_entities()`
- `warmup_entity_detector()`

Interacts with:
- Hybrid retriever
- RAG service
- Startup warmup
- KG service alias normalization

#

--------------------------------------------------

--------------------------------------------------

## 2.10 Knowledge Graph Runtime Layer

What it does:
Owns lazy Neo4j connectivity, Cypher execution, record deduplication, and conversion of graph rows to fact strings.

Why it exists:
The graph runtime must be isolated so Neo4j failure never crashes the request pipeline.

Files:
- `app/kg/kg_service.py`
- `app/kg/kg_queries.py`
- `app/kg/kg_mapper.py`

Important functions:
- `KGService.query()`
- `KGService.query_facts()`
- `KGService.get_integrations()`
- `_run_query_plan()`
- `_relationships_for_intent()`
- `records_to_facts()`

Interacts with:
- Hybrid retriever
- Neo4j
- Entity detection
- RAG service

#

--------------------------------------------------

--------------------------------------------------

## 2.11 Context Builder

What it does:
Assembles final LLM context text with KG facts first and documentation second, enforcing a token budget.

Why it exists:
The LLM prompt should preserve high-confidence graph facts and only include as much documentation as fits safely.

Files:
- `app/rag/context_builder.py`

Important functions:
- `ContextBuilder.build()`
- `ContextBuilder.build_text()`
- `_fits()`
- `_section()`

Interacts with:
- Hybrid retrieval result
- RAG service

#

--------------------------------------------------

--------------------------------------------------

## 2.12 LLM Integration Layer

What it does:
Sends completion and streaming requests to an Anthropic-compatible API with timeout, retry, parsing, and error normalization.

Why it exists:
External provider communication should be isolated from retrieval and orchestration logic.

Files:
- `app/llm_client/client.py`

Important functions:
- `LLMClient.stream_chat()`
- `LLMClient.complete_chat()`
- `_build_anthropic_payload()`
- `_extract_text_from_response()`
- `_raise_for_status()`

Interacts with:
- RAG service
- Pipeline reasoning layer
- FastAPI shutdown

#

--------------------------------------------------

--------------------------------------------------

## 2.13 Knowledge Management Service

What it does:
Reads and updates editable guided flow and API knowledge documents in MongoDB, including embedding-status resets for incremental indexing.

Why it exists:
Admin writes should go through one validation and normalization layer rather than touching MongoDB directly.

Files:
- `app/knowledge/service.py`

Important functions:
- `get_guided_flow()`
- `upsert_guided_flow()`
- `get_api_knowledge()`
- `upsert_api_knowledge()`

Interacts with:
- Admin routes
- MongoDB
- Flow engine
- Embedding worker

#

--------------------------------------------------

--------------------------------------------------

## 2.14 Cache Layer

What it does:
Caches response payloads and KG fact lookups using Redis plus a local in-process cache.

Why it exists:
Reduces repeated work for common text queries and repeated KG lookups.

Files:
- `app/cache/redis_client.py`
- `app/cache/cache_service.py`

Important functions:
- `RedisManager.connect()`
- `RedisManager.health()`
- `CacheService.get()`
- `CacheService.set()`

Interacts with:
- Pipeline controller
- Hybrid retriever
- Flow state store

#

--------------------------------------------------

--------------------------------------------------

## 2.15 MongoDB Persistence Layer

What it does:
Creates the Mongo client, exposes the database handle, and ensures vector-map and metrics indexes.

Why it exists:
Every runtime and indexing subsystem depends on a shared Mongo access abstraction.

Files:
- `app/models/mongo.py`

Important functions:
- `MongoManager.connect()`
- `MongoManager.close()`
- `MongoManager.db`

Interacts with:
- Main startup
- Pipeline
- Flow engine
- Knowledge service
- RAG service
- Scripts

#

--------------------------------------------------

--------------------------------------------------

## 2.16 Data Models and Request/Response Schemas

What it does:
Defines strict payload models for chat requests, responses, knowledge documents, and guided-flow documents.

Why it exists:
The service uses typed payloads for API stability and safe admin updates.

Files:
- `app/models/schemas.py`

Key functions/classes:
- `ChatRequest`
- `ChatResponse`
- `PipelineResult`
- `GuidedFlowConfig`
- `GuidedFlowDocument`
- `KnowledgeDocument`
- `ApiKnowledgeDocument`
- `GuidedFlowUpsertRequest`
- `ApiKnowledgeUpsertRequest`

Interacts with:
- Router
- Knowledge service
- Flow engine
- Pipeline

#

--------------------------------------------------

--------------------------------------------------

## 2.17 Incremental Indexing Worker

What it does:
Polls for pending knowledge items, claims them safely, embeds them, appends vectors to FAISS, and marks status fields in MongoDB.

Why it exists:
Knowledge edits should not require a full FAISS rebuild every time.

Files:
- `scripts/embedding_worker.py`

Important functions:
- `process_pending_once()`
- `run_forever()`
- `_acquire_worker_lock()`
- `_release_worker_lock()`
- `_should_index_item()`

Interacts with:
- Redis distributed lock
- MongoDB knowledge document
- FAISS store
- Embedding model

#

--------------------------------------------------

--------------------------------------------------

## 2.18 Full Index Build Pipeline

What it does:
Rebuilds FAISS from scratch from MongoDB knowledge items, respecting chunk classification.

Why it exists:
Supports deterministic rebuilds and recovery from index corruption or knowledge resets.

Files:
- `scripts/build_faiss_index.py`

Important functions:
- `main()`
- `_load_vector_candidate_chunk_ids()`
- `_should_index_item()`

Interacts with:
- MongoDB
- FAISS store
- Embedding model
- Chunk classification artifact

#

--------------------------------------------------

--------------------------------------------------

## 2.19 Graph-Aware Chunking Pipeline

What it does:
Transforms graph-candidate chunks into flat atomic fact triplets for Neo4j seeding.

Why it exists:
Graph ingestion must use atomic relationships rather than long, mixed sentences.

Files:
- `scripts/graph_aware_chunking.py`

Important functions:
- `build_graph_seed()`
- `write_outputs()`
- `_atomic_fact_text()`

Interacts with:
- `data/knowledge_architecture/chunk_classification.json`
- `data/knowledge_architecture/graph_seed.json`

#

--------------------------------------------------

--------------------------------------------------

## 2.20 Knowledge Graph Seed Pipeline

What it does:
Loads atomic graph triplets and merges them into Neo4j with uniqueness constraints.

Why it exists:
Runtime KG retrieval depends on a prebuilt graph.

Files:
- `scripts/build_knowledge_graph.py`

Important functions:
- `main()`
- `_load_graph_seed()`
- `_ensure_constraints()`
- `_merge_triplet()`

Interacts with:
- Neo4j
- Graph seed artifact

#

--------------------------------------------------

--------------------------------------------------

## 2.21 Knowledge Ingestion and Seeding

What it does:
Loads curated seed data, ingests frontend-derived content, or crawls live web pages into MongoDB.

Why it exists:
The system supports both packaged seed knowledge and optional site crawling.

Files:
- `scripts/seed_mongo.py`
- `scripts/ingest_frontend_content.py`
- `scripts/crawl_site.py`
- `scripts/seed_all_knowledge_bases.py`

Important functions:
- `seed_mongo.main()`
- `ingest_frontend_content.main()`
- `crawl_site.crawl()`
- `crawl_site.upsert_knowledge_from_pages()`
- `seed_all_knowledge_bases.main()`

Interacts with:
- MongoDB
- FAISS rebuild script
- Graph-aware chunking
- KG seed script

#

--------------------------------------------------

--------------------------------------------------

## 2.22 Startup Initialization Logic

What it does:
Validates env config and warms Redis, Mongo, FAISS, guided flow, entity detection, and embeddings.

Why it exists:
Moves expensive initialization out of the first user request.

Files:
- `app/main.py`
- `app/config.py`

Important functions:
- `validate_startup_settings()`
- `startup()`

Interacts with:
- All core runtime dependencies

---

--------------------------------------------------

## 3. File Guide (File Intelligence)

Simple explanation:
This section is the fastest way to locate code. It explains what each important file does, why it exists, and where it appears in the full architecture.

Navigation guide:
3.1-3.44 cover the important runtime, indexing, storage, deployment, and configuration files.

--------------------------------------------------

## 3.1 FILE: `app/main.py`

What this file does:
Bootstraps the FastAPI application, configures CORS, installs request middleware, and owns startup and shutdown lifecycle management.

Why this file exists:
The service needs one ASGI entrypoint that initializes external dependencies and exposes health and metrics endpoints.

Main responsibilities:
- Create the FastAPI app.
- Register middleware and routes.
- Validate startup configuration.
- Connect Redis and Mongo.
- Warm FAISS, flow engine, entity detection, and embeddings.
- Expose `/health` and `/metrics`.

Important functions:
- `_is_rate_limited()` is a placeholder fail-open rate-limit hook.
- `error_middleware()` wraps all requests with correlation IDs and latency logging.
- `health()` checks Redis, Mongo, and FAISS availability and integrity.
- `startup()` warms all major dependencies.
- `shutdown()` closes Redis, Mongo, Neo4j, and HTTP clients.

Used by:
- Uvicorn via `app.main:app`.
- `scripts/run_api.py`.

Depends on:
- `app/router.py`
- `app/config.py`
- `app/cache/redis_client.py`
- `app/models/mongo.py`
- `app/rag/vector_store.py`
- `app/rag/embeddings.py`
- `app/flow_engine/engine.py`
- `app/kg/entity_detection.py`
- `app/kg/kg_service.py`
- `app/llm_client/client.py`
- `app/utils/logging.py`
- `app/utils/metrics.py`

Used in which system flow:
This is the first runtime file involved when the process starts and the first HTTP-level layer every request crosses.

#

--------------------------------------------------

--------------------------------------------------

## 3.2 FILE: `app/router.py`

What this file does:
Defines HTTP endpoints for chat and knowledge administration.

Why this file exists:
Separates HTTP request handling from the deeper chat orchestration logic.

Main responsibilities:
- Accept validated chat requests.
- Forward them to the pipeline controller.
- Return JSON or SSE streaming responses.
- Protect admin knowledge endpoints with an optional token.
- Expose backward-compatible legacy routes.

Important functions:
- `_run_chat_request()` delegates to `chat_pipeline_controller.run()`.
- `chat_endpoint()` serves `POST /chat`.
- `chat_endpoint_legacy()` preserves `POST /api/chatbot/chat`.
- `chatbot_intro()` preserves a legacy intro route.
- `get_guided_knowledge()` and `upsert_guided_knowledge()` manage guided flow.
- `get_api_knowledge()` and `upsert_api_knowledge()` manage API knowledge.

Used by:
- FastAPI app in `app/main.py`.

Depends on:
- `app/pipeline.py`
- `app/knowledge/service.py`
- `app/models/schemas.py`
- `app/config.py`

Used in which system flow:
This is the API boundary between HTTP and internal pipeline logic.

#

--------------------------------------------------

--------------------------------------------------

## 3.3 FILE: `app/config.py`

What this file does:
Defines and validates all application settings.

Why this file exists:
Centralized configuration is required for runtime consistency across API, indexing, graph, and LLM layers.

Main responsibilities:
- Define env-backed settings.
- Provide a cached singleton settings object.
- Validate critical runtime configuration on startup.

Important functions:
- `get_settings()` returns the cached `Settings` instance.
- `validate_startup_settings()` checks Redis, Mongo, FAISS, LLM, and Neo4j requirements.

Used by:
- Nearly every runtime and script module.

Depends on:
- `pydantic_settings`

Used in which system flow:
Configuration is read during process boot and throughout runtime decision-making.

#

--------------------------------------------------

--------------------------------------------------

## 3.4 FILE: `app/models/schemas.py`

What this file does:
Declares strict Pydantic models for all external and internal data contracts.

Why this file exists:
The system uses typed payloads for API stability and safe admin updates.

Main responsibilities:
- Define chat request/response schemas.
- Define flow schemas.
- Define editable API knowledge schemas.
- Validate flow references.

KEY FUNCTIONS / CLASSES:
- `ChatRequest`
- `ChatResponse`
- `PipelineResult`
- `GuidedFlowState`
- `GuidedFlowConfig`
- `GuidedFlowDocument`
- `KnowledgeDocument`
- `ApiKnowledgeDocument`

Used by:
- `app/router.py`
- `app/flow_engine/engine.py`
- `app/knowledge/service.py`
- `app/pipeline.py`
- `app/rag/service.py`
- `app/structured_handler/handler.py`

Depends on:
- Pydantic

Used in which system flow:
These models shape nearly all inbound, outbound, and persisted knowledge payloads.

#

--------------------------------------------------

--------------------------------------------------

## 3.5 FILE: `app/models/mongo.py`

What this file does:
Provides the shared MongoDB manager.

Why this file exists:
MongoDB connectivity, database access, and collection index setup should be centralized.

Main responsibilities:
- Connect to MongoDB.
- Expose the configured DB handle.
- Create FAISS mapping and metrics indexes.
- Close the client on shutdown.

Important functions:
- `MongoManager.connect()`
- `MongoManager.close()`
- `MongoManager.db`

Used by:
- `app/main.py`
- `app/pipeline.py`
- `app/flow_engine/engine.py`
- `app/knowledge/service.py`
- `app/rag/service.py`
- `app/structured_handler/handler.py`
- `app/rag/vector_store.py`
- scripts

Depends on:
- `app/config.py`

Used in which system flow:
Mongo is the persistent source of truth for guided flow, API knowledge, FAISS vector mapping, and chat metrics.

#

--------------------------------------------------

--------------------------------------------------

## 3.6 FILE: `app/pipeline.py`

What this file does:
Acts as the central runtime controller for chat requests.

Why this file exists:
This system is not a single-step chatbot; it needs an ordered decision engine to coordinate cache, flow, structured answers, retrieval, optional reasoning, and frontend response shaping.

Main responsibilities:
- Normalize input.
- Enforce input size limits.
- Handle learn-more and main-menu button behavior.
- Read and write cache.
- Invoke guided flow.
- Invoke structured handler.
- Detect intent.
- Invoke RAG.
- Decide whether reasoning fallback should run.
- Finalize UI payloads, buttons, short/full messages, and scroll targets.
- Record usage metrics to MongoDB.

Important functions:
- `run()` is the main runtime path.
- `_finalize_response_payload()` performs the main post-processing and UI contract logic.
- `_finalize_response_ui()` finalizes public response buttons and message variants.
- `_detect_intent()` derives frontend-intent labels.
- `_build_reasoning_messages()` creates reasoning prompts.
- `_should_use_reasoning_layer()` decides when the reasoning fallback should run.
- `_record_usage()` writes chat metrics.

Used by:
- `app/router.py`

Depends on:
- `app/cache/cache_service.py`
- `app/flow_engine/engine.py`
- `app/flow_engine/state_store.py`
- `app/structured_handler/handler.py`
- `app/rag/service.py`
- `app/llm_client/client.py`
- `app/models/mongo.py`
- `app/utils/text.py`
- `app/utils/tracking.py`
- `app/utils/metrics.py`

Used in which system flow:
Every chat request passes through this file. It is the single most important runtime orchestration module in the repository.

#

--------------------------------------------------

--------------------------------------------------

## 3.7 FILE: `app/flow_engine/engine.py`

What this file does:
Implements deterministic guided-flow behavior.

Why this file exists:
Website chatbot users often click through menus or ask short navigation-style questions that should not trigger RAG.

Main responsibilities:
- Load fallback flow config from disk.
- Reload flow config from MongoDB with caching.
- Convert flow states to `ChatResponse`.
- Manage trigger matching, button transitions, loop protection, and timeout logic.

Important functions:
- `warmup()`
- `_load_config()`
- `_get_config()`
- `_build_response()`
- `_main_menu()`
- `process()`

Used by:
- `app/pipeline.py`
- startup warmup in `app/main.py`

Depends on:
- `app/flow_engine/state_store.py`
- `app/models/mongo.py`
- `app/models/schemas.py`
- `app/utils/text.py`

Used in which system flow:
Checked after cache and before structured/RAG logic.

#

--------------------------------------------------

--------------------------------------------------

## 3.8 FILE: `app/flow_engine/state_store.py`

What this file does:
Stores flow session state in Redis.

Why this file exists:
Guided flow is stateful across messages and button clicks.

Main responsibilities:
- Read session flow state.
- Write session flow state with TTL.
- Clear session state.

Important functions:
- `get_state()`
- `set_state()`
- `clear_state()`

Used by:
- `app/flow_engine/engine.py`
- `app/pipeline.py`

Depends on:
- `app/cache/redis_client.py`
- `app/config.py`

Used in which system flow:
Supports deterministic multi-turn state in the guided menu subsystem.

#

--------------------------------------------------

--------------------------------------------------

## 3.9 FILE: `app/flow_engine/flow_config.json`

What this file does:
Stores the fallback guided flow definition.

Why this file exists:
The guided flow needs a packaged default even when MongoDB has no override document.

Main responsibilities:
- Define trigger words such as `services`, `pricing`, `contact`, `faq`.
- Define flow states and transitions.
- Define button labels and button values.
- Provide fallback pricing, industries, FAQ, about, and service menus.

KEY CONTENT:
- Triggers route to `services_menu`, `industries_menu`, `pricing_menu`, `contact_info`, `about_company`, `faq_menu`.
- States include `welcome`, service detail states, industry states, pricing states, and FAQ states.

Used by:
- `app/flow_engine/engine.py`
- `scripts/seed_mongo.py`
- `app/knowledge/service.py`

Depends on:
- No Python imports; consumed as JSON.

Used in which system flow:
Used during flow warmup and whenever Mongo does not provide a fresher config.

#

--------------------------------------------------

--------------------------------------------------

## 3.10 FILE: `app/structured_handler/handler.py`

What this file does:
Implements deterministic structured responses for specific common intents.

Why this file exists:
Direct business facts should be answered without retrieval complexity.

Main responsibilities:
- Detect login intent.
- Detect contact intent.
- Detect pricing and consultation intent.
- Detect blogs and FAQ intent.
- Read a small business-profile subset from Mongo.
- Return preformatted `ChatResponse` objects.

Important functions:
- `_knowledge_doc()`
- `_is_login_intent()`
- `_is_contact_intent()`
- `_is_pricing_intent()`
- `_is_consultation_intent()`
- `_is_blog_intent()`
- `_is_faq_intent()`
- `handle()`

Used by:
- `app/pipeline.py`

Depends on:
- `app/models/mongo.py`
- `app/models/schemas.py`
- `app/config.py`
- `app/utils/text.py`

Used in which system flow:
Runs after guided flow and before RAG.

#

--------------------------------------------------

--------------------------------------------------

## 3.11 FILE: `app/knowledge/service.py`

What this file does:
Implements read and write operations for guided flow and API knowledge documents.

Why this file exists:
Admin updates need validation, normalization, fallback construction, and embedding-status handling.

Main responsibilities:
- Read guided flow from Mongo or local fallback.
- Upsert guided flow with version bump.
- Read API knowledge from Mongo or compatibility collections.
- Upsert API knowledge and mark items `pending` for reindex.

Important functions:
- `get_guided_flow()`
- `upsert_guided_flow()`
- `get_api_knowledge()`
- `upsert_api_knowledge()`

Used by:
- `app/router.py`

Depends on:
- `app/models/mongo.py`
- `app/models/schemas.py`
- `app/config.py`
- `app/flow_engine/flow_config.json`

Used in which system flow:
Used by admin endpoints, not by normal user chat requests directly, but it shapes the data consumed by flow and retrieval.

#

--------------------------------------------------

--------------------------------------------------

## 3.12 FILE: `app/cache/redis_client.py`

What this file does:
Provides the shared Redis async client.

Why this file exists:
Multiple subsystems use Redis and should not each manage their own connection behavior.

Main responsibilities:
- Create the Redis client.
- Retry initial connection.
- Expose health checks.
- Close the client cleanly.

Important functions:
- `connect()`
- `close()`
- `health()`
- `client`

Used by:
- `app/main.py`
- `app/cache/cache_service.py`
- `app/flow_engine/state_store.py`

Depends on:
- `app/config.py`

Used in which system flow:
Initialized at startup and used during runtime caching and session state.

#

--------------------------------------------------

--------------------------------------------------

## 3.13 FILE: `app/cache/cache_service.py`

What this file does:
Implements namespaced cache access with both in-process memory and Redis.

Why this file exists:
Chat and KG result caching should have one consistent implementation.

Main responsibilities:
- Build namespaced cache keys.
- Read cache entries from local memory first, then Redis.
- Write cache entries to both local memory and Redis.
- Enforce max payload size.

Important functions:
- `_key()`
- `get()`
- `set()`

Used by:
- `app/pipeline.py`
- `app/hybrid/hybrid_retriever.py`

Depends on:
- `app/cache/redis_client.py`
- `app/config.py`

Used in which system flow:
Used for response replay and KG fact caching.

#

--------------------------------------------------

--------------------------------------------------

## 3.14 FILE: `app/rag/embeddings.py`

What this file does:
Handles query and document embedding generation.

Why this file exists:
Embedding logic must be reusable across runtime retrieval and indexing scripts.

Main responsibilities:
- Lazily load a local sentence-transformer model.
- Provide deterministic fallback embeddings.
- Normalize vectors.
- Warm the embedding path during startup.

Important functions:
- `_get_model()`
- `_fallback_embedding()`
- `embed_text()`
- `warmup_embeddings()`

Used by:
- `app/rag/service.py`
- `app/main.py`
- `scripts/build_faiss_index.py`
- `scripts/embedding_worker.py`

Depends on:
- `app/config.py`

Used in which system flow:
Used at query time and during FAISS indexing.

#

--------------------------------------------------

--------------------------------------------------

## 3.15 FILE: `app/rag/vector_store.py`

What this file does:
Owns the in-memory FAISS index and vector metadata mapping.

Why this file exists:
Runtime retrieval needs a persistent vector index plus a position-to-doc lookup layer.

Main responsibilities:
- Load FAISS from disk.
- Load vector mapping from Mongo.
- Validate alignment between FAISS and mapping rows.
- Persist the index to disk.
- Append new vectors.
- Search vectors.

Important functions:
- `warmup()`
- `load()`
- `_load_vector_mapping()`
- `validate_integrity()`
- `persist()`
- `add_vectors()`
- `search()`
- `get_doc_ref()`

Used by:
- `app/main.py`
- `app/rag/service.py`
- `scripts/build_faiss_index.py`
- `scripts/embedding_worker.py`

Depends on:
- `app/config.py`
- `app/models/mongo.py`

Used in which system flow:
This file is the runtime semantic index abstraction used during every RAG lookup.

#

--------------------------------------------------

--------------------------------------------------

## 3.16 FILE: `app/rag/context_builder.py`

What this file does:
Builds prompt context from hybrid retrieval results.

Why this file exists:
The system needs prompt-safe ordering and budget trimming independent of retrieval mechanics.

Main responsibilities:
- Deduplicate KG facts and vector chunks.
- Preserve KG facts first.
- Trim to a token budget.
- Return both final context and preview sections.

Important functions:
- `build()`
- `build_text()`
- `_section()`
- `_fits()`

Used by:
- `app/rag/service.py`

Depends on:
- `app/utils/text.py`

Used in which system flow:
Used after hybrid retrieval and before prompt construction.

#

--------------------------------------------------

--------------------------------------------------

## 3.17 FILE: `app/rag/service.py`

What this file does:
Implements the entire retrieval and grounded synthesis layer.

Why this file exists:
This file centralizes the retrieval pipeline so FAISS search, KG enrichment, reranking, prompt construction, and deterministic synthesis stay consistent.

Main responsibilities:
- Embed the query.
- Read `knowledge_items` from Mongo.
- Search FAISS.
- Compute keyword overlap scores.
- Rerank and filter candidates by intent.
- Apply MMR selection.
- Deduplicate evidence sentences.
- Decide whether KG should run.
- Merge vector and KG evidence.
- Build context.
- Produce deterministic KG answers.
- Produce deterministic local fallback synthesis.
- Build LLM prompt messages.
- Support streaming and non-streaming synthesis.

Important functions:
- `run()`
- `_keyword_scores()`
- `_infer_item_category()`
- `_filter_by_intent()`
- `_filter_text_by_intent()`
- `_apply_intent_category_penalty()`
- `_mmr_select()`
- `_build_hybrid_router_decision()`
- `_answer_from_kg_facts()`
- `_synthesize_hybrid_answer()`
- `_build_synthesis_messages()`
- `_enforce_answer_shape()`

Used by:
- `app/pipeline.py`

Depends on:
- `app/rag/embeddings.py`
- `app/rag/vector_store.py`
- `app/rag/context_builder.py`
- `app/hybrid/hybrid_retriever.py`
- `app/kg/entity_detection.py`
- `app/llm_client/client.py`
- `app/models/mongo.py`
- `app/utils/text.py`
- `app/utils/metrics.py`

Used in which system flow:
This is the core runtime retrieval file entered whenever the request is not solved by cache, guided flow, or structured handling.

#

--------------------------------------------------

--------------------------------------------------

## 3.18 FILE: `app/hybrid/hybrid_retriever.py`

What this file does:
Combines vector evidence and KG evidence into one retrieval result.

Why this file exists:
Hybrid retrieval is a distinct concern from raw FAISS search or raw Neo4j access.

Main responsibilities:
- Accept router decisions and preselected vector text.
- Trigger entity detection if needed.
- Cache KG fact lookups.
- Query KG when enabled and relevant.
- Deduplicate facts and chunks.
- Produce merged context and confidence metadata.

Important functions:
- `retrieve()`
- `_cache_key()`
- `_dedupe_texts()`
- `format_kg_fact_block()`
- `_combined_context()`
- `_confidence()`

Used by:
- `app/rag/service.py`

Depends on:
- `app/cache/cache_service.py`
- `app/kg/entity_detection.py`
- `app/kg/kg_service.py`
- `app/config.py`

Used in which system flow:
Runs after FAISS chunk selection and before context building.

#

--------------------------------------------------

--------------------------------------------------

## 3.19 FILE: `app/kg/entity_detection.py`

What this file does:
Detects entities and graph-relevant intent from queries.

Why this file exists:
KG lookups should be selective and entity-aware.

Main responsibilities:
- Maintain alias table for services, tools, platforms, and features.
- Optionally use spaCy NER.
- Prefer lexical entity matches for business-specific terms.
- Infer intent categories such as `integration_lookup`, `tool_lookup`, and `pricing_lookup`.

Important functions:
- `_load_spacy_model()`
- `warmup_entity_detector()`
- `_detect_lexical_entities()`
- `_detect_spacy_entities()`
- `_infer_intent()`
- `detect_entities()`

Used by:
- `app/hybrid/hybrid_retriever.py`
- `app/rag/service.py`
- `app/main.py`
- `app/kg/kg_service.py`

Depends on:
- optional `spacy`

Used in which system flow:
Runs before Neo4j retrieval when the system needs to know if the query is graph-worthy.

#

--------------------------------------------------

--------------------------------------------------

## 3.20 FILE: `app/kg/kg_queries.py`

What this file does:
Stores all runtime Cypher query templates.

Why this file exists:
Separates graph query text from graph query execution.

Main responsibilities:
- Define entity relationship query.
- Define service-target relationship query.
- Define service-only relationship query.
- Define relation-type query.
- Define integration lookup query.

KEY CONTENT:
- `ENTITY_RELATIONSHIPS`
- `SERVICE_TARGET_RELATIONSHIPS`
- `SERVICE_RELATIONSHIPS`
- `RELATIONSHIPS_BY_TYPE`
- `SERVICE_INTEGRATIONS`

Used by:
- `app/kg/kg_service.py`

Depends on:
- None

Used in which system flow:
Executed by the KG runtime layer during hybrid retrieval.

#

--------------------------------------------------

--------------------------------------------------

## 3.21 FILE: `app/kg/kg_mapper.py`

What this file does:
Converts raw Neo4j records into readable fact strings.

Why this file exists:
The graph runtime returns rows; the LLM/retrieval layers need natural-language facts.

Main responsibilities:
- Map relationship names to readable phrases.
- Convert one record to one fact.
- Deduplicate many facts.

Important functions:
- `_relationship_to_phrase()`
- `record_to_fact()`
- `records_to_facts()`

Used by:
- `app/kg/kg_service.py`

Depends on:
- None

Used in which system flow:
Final transformation before KG evidence enters hybrid retrieval.

#

--------------------------------------------------

--------------------------------------------------

## 3.22 FILE: `app/kg/kg_service.py`

What this file does:
Implements runtime Neo4j access and safe KG querying.

Why this file exists:
KG retrieval needs lazy connection handling, intent filtering, timeout control, and graceful failure.

Main responsibilities:
- Lazily initialize Neo4j driver.
- Canonicalize entity names.
- Choose relationship filters from detected intent.
- Run query plans inside worker threads.
- Deduplicate records.
- Return fact strings plus confidence and availability metadata.

Important functions:
- `_get_driver()`
- `_driver_unavailable_reason()`
- `_run_query()`
- `_run_query_plan()`
- `_relationships_for_intent()`
- `_partition_entities()`
- `query()`
- `query_facts()`
- `get_integrations()`
- `close()`

Used by:
- `app/hybrid/hybrid_retriever.py`
- `app/main.py`

Depends on:
- `app/kg/kg_queries.py`
- `app/kg/entity_detection.py`
- `app/kg/kg_mapper.py`
- `app/config.py`
- `neo4j`

Used in which system flow:
This file is the only runtime module that talks directly to Neo4j.

#

--------------------------------------------------

--------------------------------------------------

## 3.23 FILE: `app/llm_client/client.py`

What this file does:
Implements streaming and completion transport to the external LLM provider.

Why this file exists:
Provider communication should be abstracted behind retry logic, error normalization, and provider-specific request formatting.

Main responsibilities:
- Build Anthropic-compatible payloads.
- Parse SSE stream lines.
- Handle concurrency limits.
- Apply retry and backoff.
- Normalize provider errors.
- Expose streaming and non-streaming chat APIs.

Important functions:
- `AnthropicStreamParser.parse_line()`
- `LLMClient.stream_chat()`
- `LLMClient.complete_chat()`
- `_build_anthropic_payload()`
- `_raise_for_status()`

Used by:
- `app/rag/service.py`
- `app/pipeline.py`
- `app/main.py`

Depends on:
- `httpx`
- `async_timeout`
- `app/config.py`
- `app/utils/metrics.py`

Used in which system flow:
Used only after the retrieval stack has already prepared grounded context or reasoning prompts.

#

--------------------------------------------------

--------------------------------------------------

## 3.24 FILE: `app/utils/text.py`

What this file does:
Provides common text normalization, hashing, token counting, and context clipping helpers.

Why this file exists:
These operations are shared by pipeline, flow, retrieval, and usage estimation.

Main responsibilities:
- Normalize user input.
- Generate stable hashes.
- Tokenize text.
- Estimate token counts.
- Deduplicate repeated generated phrases.
- Clamp context size.

Important functions:
- `normalize_input()`
- `hash_text()`
- `tokenize_words()`
- `approx_token_count()`
- `dedupe_phrases()`
- `clamp_context()`

Used by:
- `app/pipeline.py`
- `app/flow_engine/engine.py`
- `app/structured_handler/handler.py`
- `app/rag/service.py`
- `app/rag/context_builder.py`
- `app/utils/tracking.py`

Depends on:
- Python stdlib

Used in which system flow:
Shared utility layer across runtime and retrieval logic.

#

--------------------------------------------------

--------------------------------------------------

## 3.25 FILE: `app/utils/metrics.py`

What this file does:
Defines Prometheus counters and histograms.

Why this file exists:
Operational observability is required for production chat systems.

Main responsibilities:
- Count requests, cache hits, flow hits, structured hits, RAG hits, LLM errors, and fallbacks.
- Measure request, retrieval, rerank, and LLM latency.
- Export Prometheus payloads.

Important functions:
- `metrics_payload()`

Used by:
- `app/main.py`
- `app/pipeline.py`
- `app/rag/service.py`
- `app/llm_client/client.py`

Depends on:
- `prometheus_client`

Used in which system flow:
Used for health and operations, not for end-user logic.

#

--------------------------------------------------

--------------------------------------------------

## 3.26 FILE: `app/utils/tracking.py`

What this file does:
Estimates token usage and cost for chat interactions.

Why this file exists:
The system records approximate usage and cost even when exact tokenizer accounting is not available.

Main responsibilities:
- Estimate input and output tokens.
- Estimate costs using configured rates.
- Return a serializable usage record.

Important functions:
- `calculate_usage()`
- `UsageRecord.to_dict()`

Used by:
- `app/pipeline.py`

Depends on:
- `app/utils/text.py`

Used in which system flow:
Used after responses are generated to record usage data in MongoDB.

#

--------------------------------------------------

--------------------------------------------------

## 3.27 FILE: `app/utils/logging.py`

What this file does:
Implements structured JSON logging.

Why this file exists:
Production services need machine-parsable logs across API, worker, and retrieval layers.

Main responsibilities:
- Format log records as JSON.
- Install process-wide logging handlers.

Important functions:
- `JsonFormatter.format()`
- `setup_logging()`

Used by:
- `app/main.py`
- scripts that initialize logging

Depends on:
- Python `logging`

Used in which system flow:
Cross-cutting operational layer.

#

--------------------------------------------------

--------------------------------------------------

## 3.28 FILE: `scripts/seed_mongo.py`

What this file does:
Seeds MongoDB with packaged production knowledge and flow configuration.

Why this file exists:
The runtime depends on `chatbot_api_knowledge` and `chatbot_guided_flow` being populated.

Main responsibilities:
- Load `data/seed/mongo_seed.json`.
- Convert seed knowledge items into editable `knowledge_items`.
- Seed `chatbot_api_knowledge`.
- Seed `chatbot_guided_flow`.
- Preserve compatibility collections `business_profile`, `plans`, and `rag_documents`.
- Clear `faiss_vector_map`.

Important functions:
- `main()`

Used by:
- `scripts/seed_all_knowledge_bases.py`
- operational setup workflows

Depends on:
- `app/config.py`
- `app/flow_engine/flow_config.json`
- `data/seed/mongo_seed.json`

Used in which system flow:
One of the first setup steps before FAISS or KG are built.

#

--------------------------------------------------

--------------------------------------------------

## 3.29 FILE: `scripts/ingest_frontend_content.py`

What this file does:
Imports curated frontend-derived content into MongoDB.

Why this file exists:
Supports syncing packaged seed knowledge into compatibility collections and the editable API knowledge document.

Main responsibilities:
- Load seed file.
- Repopulate `rag_documents` seed records.
- Merge frontend seed items into `chatbot_api_knowledge`.
- Mark new items `pending` for embeddings.

Important functions:
- `main()`

Used by:
- Manual ingestion workflows

Depends on:
- `data/seed/mongo_seed.json`
- `app/config.py`

Used in which system flow:
Ingestion/maintenance path rather than request-time logic.

#

--------------------------------------------------

--------------------------------------------------

## 3.30 FILE: `scripts/graph_aware_chunking.py`

What this file does:
Converts graph candidates into atomic facts and writes graph artifacts.

Why this file exists:
Graph knowledge must be represented as one relationship per fact for reliable Neo4j ingestion.

Main responsibilities:
- Read chunk classification output.
- Extract graph candidate triplets.
- Deduplicate triplets.
- Produce flat `graph_seed.json`.
- Produce a graph extraction report.

Important functions:
- `build_graph_seed()`
- `write_outputs()`
- `_atomic_fact_text()`

Used by:
- `scripts/seed_all_knowledge_bases.py`
- `scripts/build_knowledge_graph.py`

Depends on:
- `data/knowledge_architecture/chunk_classification.json`

Used in which system flow:
Preprocessing step between classification and Neo4j seeding.

#

--------------------------------------------------

--------------------------------------------------

## 3.31 FILE: `scripts/build_knowledge_graph.py`

What this file does:
Seeds the Neo4j graph database from graph seed artifacts.

Why this file exists:
Runtime KG retrieval requires a prebuilt graph with nodes, relationships, and uniqueness constraints.

Main responsibilities:
- Load and normalize graph seed triplets.
- Establish Neo4j connectivity.
- Create uniqueness constraints per label.
- `MERGE` nodes and relationships.
- Preserve `source_chunk_ids` and `atomic_fact` on relationships.

Important functions:
- `_load_graph_seed()`
- `_ensure_constraints()`
- `_merge_triplet()`
- `main()`

Used by:
- `scripts/seed_all_knowledge_bases.py`

Depends on:
- `data/knowledge_architecture/graph_seed.json`
- `app/config.py`
- `neo4j`

Used in which system flow:
Offline build step for the runtime KG layer.

#

--------------------------------------------------

--------------------------------------------------

## 3.32 FILE: `scripts/build_faiss_index.py`

What this file does:
Rebuilds the FAISS vector store from MongoDB knowledge items.

Why this file exists:
Supports deterministic full rebuilds and recovery from corruption or major content resets.

Main responsibilities:
- Read `chatbot_api_knowledge.knowledge_items`.
- Filter items through classification policy.
- Embed eligible chunks.
- Reset the FAISS index.
- Reset `faiss_vector_map`.
- Reinsert vectors and update `embedding_status`.

Important functions:
- `_load_vector_candidate_chunk_ids()`
- `_should_index_item()`
- `main()`

Used by:
- `scripts/seed_all_knowledge_bases.py`
- `scripts/crawl_site.py` when `--reindex` is used

Depends on:
- `app/rag/embeddings.py`
- `app/rag/vector_store.py`
- `data/knowledge_architecture/chunk_classification.json`

Used in which system flow:
Offline indexing path for semantic retrieval.

#

--------------------------------------------------

--------------------------------------------------

## 3.33 FILE: `scripts/embedding_worker.py`

What this file does:
Runs incremental FAISS indexing in the background.

Why this file exists:
Editable knowledge updates should become retrievable without rebuilding the entire index.

Main responsibilities:
- Acquire a Redis distributed lock.
- Scan `knowledge_items` for `embedding_status == pending`.
- Claim items atomically by setting `processing` and owner fields.
- Embed claimed items.
- Append them to FAISS.
- Mark items `indexed` or `failed`.
- Repeat forever with a poll interval.

Important functions:
- `_acquire_worker_lock()`
- `_release_worker_lock()`
- `process_pending_once()`
- `run_forever()`

Used by:
- systemd worker service
- manual ops runs

Depends on:
- `app/models/mongo.py`
- `app/rag/embeddings.py`
- `app/rag/vector_store.py`
- `app/config.py`
- `data/knowledge_architecture/chunk_classification.json`

Used in which system flow:
Background incremental indexing worker; not on the request path.

#

--------------------------------------------------

--------------------------------------------------

## 3.34 FILE: `scripts/crawl_site.py`

What this file does:
Crawls a website and ingests visible page text into the chatbot knowledge store.

Why this file exists:
Supports optional knowledge acquisition from live website content.

Main responsibilities:
- Crawl pages in-domain using Playwright.
- Extract visible HTML text.
- Chunk long pages.
- Hash and deduplicate chunks.
- Upsert crawled chunks into `chatbot_api_knowledge`.
- Optionally trigger FAISS rebuild.

Important functions:
- `crawl()`
- `fetch_with_retry()`
- `extract_visible_text()`
- `chunk_text()`
- `upsert_knowledge_from_pages()`

Used by:
- Manual ingestion workflows

Depends on:
- Playwright
- BeautifulSoup
- MongoDB
- `scripts/build_faiss_index.py`

Used in which system flow:
Content ingestion path, not runtime chat handling.

#

--------------------------------------------------

--------------------------------------------------

## 3.35 FILE: `scripts/run_api.py`

What this file does:
Launches the FastAPI app with a single-instance guard.

Why this file exists:
Prevents multiple API processes from binding the same port or stomping over each other.

Main responsibilities:
- Read and write a runtime lock file.
- Check whether an existing process is alive.
- Ensure the target port is free.
- Launch Uvicorn as a child process.
- Forward SIGINT and SIGTERM.

Important functions:
- `_pid_alive()`
- `_port_free()`
- `_read_lock()`
- `_write_lock()`
- `_remove_lock()`
- `main()`

Used by:
- systemd service
- manual runs

Depends on:
- `app.main:app` via Uvicorn import string

Used in which system flow:
Process-launch wrapper outside the runtime request pipeline.

#

--------------------------------------------------

--------------------------------------------------

## 3.36 FILE: `scripts/seed_all_knowledge_bases.py`

What this file does:
Runs the full seed pipeline end to end.

Why this file exists:
Ops need one command to seed MongoDB, generate graph artifacts, seed Neo4j, and rebuild FAISS.

Main responsibilities:
- Run Mongo seed.
- Run graph-aware chunking.
- Run Neo4j seed.
- Run FAISS rebuild.

Important functions:
- `_run_step()`
- `_run_async_step()`
- `main()`

Used by:
- Deployment/setup operators

Depends on:
- `scripts/seed_mongo.py`
- `scripts/graph_aware_chunking.py`
- `scripts/build_knowledge_graph.py`
- `scripts/build_faiss_index.py`

Used in which system flow:
Environment bootstrap pipeline.

#

--------------------------------------------------

--------------------------------------------------

## 3.37 FILE: `data/seed/mongo_seed.json`

What this file does:
Curated seed knowledge dataset.

Why this file exists:
Provides the base business profile, plans, and knowledge chunks that populate MongoDB.

Main responsibilities:
- Store seed knowledge items with chunk IDs, source pages, topics, entities, and content types.
- Provide business profile and plans.

Used by:
- `scripts/seed_mongo.py`
- `scripts/ingest_frontend_content.py`
- indirectly by classification and graph artifact generation

Used in which system flow:
Source data for initial knowledge population.

#

--------------------------------------------------

--------------------------------------------------

## 3.38 FILE: `data/knowledge_architecture/chunk_classification.json`

What this file does:
Stores the chunk-classification output that decides which chunks belong in vector search, graph storage, or deterministic flow.

Why this file exists:
The system intentionally separates semantic text, graph facts, and deterministic menu content.

Main responsibilities:
- Mark each chunk as `VECTOR_CANDIDATE`, `GRAPH_CANDIDATE`, or `FLOW_CANDIDATE`.
- Store graph triplets for graph candidates.
- Declare vector index policy.

Used by:
- `scripts/graph_aware_chunking.py`
- `scripts/build_faiss_index.py`
- `scripts/embedding_worker.py`

Used in which system flow:
Offline knowledge architecture artifact used by both graph and vector indexing pipelines.

#

--------------------------------------------------

--------------------------------------------------

## 3.39 FILE: `data/knowledge_architecture/graph_seed.json`

What this file does:
Stores flattened atomic graph triplets ready for Neo4j ingestion.

Why this file exists:
The Neo4j seed script consumes a graph-ready, deduplicated relationship artifact rather than raw source chunks.

Main responsibilities:
- Store atomic facts with subject label, predicate, object label, and source chunk IDs.
- Store extraction counts and per-chunk fact counts.

Used by:
- `scripts/build_knowledge_graph.py`

Used in which system flow:
Offline KG build artifact.

#

--------------------------------------------------

--------------------------------------------------

## 3.40 FILE: `data/faiss/index.faiss`

What this file does:
Persisted FAISS vector index file.

Why this file exists:
Runtime FAISS warmup and search require a persisted on-disk index.

Main responsibilities:
- Store semantic vectors for retrievable knowledge chunks.

Used by:
- `app/rag/vector_store.py`

Used in which system flow:
Loaded during startup and queried during runtime retrieval.

#

--------------------------------------------------

--------------------------------------------------

## 3.41 FILE: `deploy/systemd/ttt-rag-api.service`

What this file does:
Systemd unit for the API process.

Why this file exists:
Provides production service management for the FastAPI app.

Main responsibilities:
- Set working directory.
- Set environment variables.
- Launch `scripts/run_api.py`.
- Restart on failure.

Used by:
- Linux service manager

Used in which system flow:
Deployment/runtime operations.

#

--------------------------------------------------

--------------------------------------------------

## 3.42 FILE: `deploy/systemd/ttt-rag-embedding-worker.service`

What this file does:
Systemd unit for the embedding worker.

Why this file exists:
Allows incremental indexing to run continuously as a managed background process.

Main responsibilities:
- Launch `scripts/embedding_worker.py`.
- Restart on failure.

Used by:
- Linux service manager

Used in which system flow:
Background indexing operations.

#

--------------------------------------------------

--------------------------------------------------

## 3.43 FILE: `deploy/nginx/ttt-rag-chatbot.conf`

What this file does:
Example reverse proxy configuration for the chatbot API.

Why this file exists:
Production deployments commonly terminate public HTTP at Nginx and proxy to Uvicorn.

Main responsibilities:
- Proxy requests to `127.0.0.1:8001`.
- Preserve proxy headers.
- Disable buffering for long-lived chat streams.

Used by:
- Nginx

Used in which system flow:
Deployment edge layer.

#

--------------------------------------------------

--------------------------------------------------

## 3.44 FILE: `.env.example`

What this file does:
Example runtime configuration file.

Why this file exists:
Documents required and optional environment variables for API, indexing, graph, and LLM setup.

Main responsibilities:
- Show Redis, Mongo, FAISS, KG, embedding, LLM, and lockfile settings.

Used by:
- Developers and deployment automation

Used in which system flow:
Configuration bootstrap.

---

--------------------------------------------------

## 4. User Query Flow

Simple explanation:
This section follows one user message from the API boundary all the way to the final chatbot response.

Navigation guide:
4.1 Full pipeline
4.2 Step-by-step explanation

--------------------------------------------------

## 4.1 Full pipeline

```text
User Query
  â†“
POST /chat or /api/chatbot/chat
  File: app/router.py
  â†“
chat_pipeline_controller.run(...)
  File: app/pipeline.py
  â†“
Normalize input, validate length, handle main-menu / learn-more button edge cases
  File: app/pipeline.py
  â†“
Cache lookup
  File: app/cache/cache_service.py
  â†“
Guided flow check
  File: app/flow_engine/engine.py
  â†“
Structured deterministic handler
  File: app/structured_handler/handler.py
  â†“
RAG retrieval path
  File: app/rag/service.py
  â†“
Query embedding
  File: app/rag/embeddings.py
  â†“
FAISS similarity search
  File: app/rag/vector_store.py
  â†“
Mongo knowledge item lookup and reranking
  File: app/rag/service.py
  â†“
Entity detection
  File: app/kg/entity_detection.py
  â†“
Hybrid routing decision
  File: app/rag/service.py
  â†“
Optional Neo4j knowledge graph lookup
  File: app/kg/kg_service.py
  â†“
Merge KG facts + vector chunks
  File: app/hybrid/hybrid_retriever.py
  â†“
Prompt context assembly
  File: app/rag/context_builder.py
  â†“
Either:
  - deterministic KG answer
  - local retrieval synthesis
  - or LLM synthesis
  File: app/rag/service.py
  â†“
Optional reasoning fallback if weak RAG and enabled
  File: app/pipeline.py + app/llm_client/client.py
  â†“
Response shaping, short/full message contract, buttons, scroll target, learn-more payload
  File: app/pipeline.py
  â†“
JSONResponse or StreamingResponse
  File: app/router.py
```

#

--------------------------------------------------

--------------------------------------------------

## 4.2 Step-by-step explanation

1. HTTP entry
   `app/router.py` receives a validated `ChatRequest`.

2. Pipeline entry
   `app/pipeline.py:ChatPipelineController.run()` becomes the central controller.

3. Input normalization
   `normalize_input()` lowercases, trims, and compresses whitespace.

4. Cache attempt
   For normal text requests, the pipeline hashes the query plus routing context and checks `CacheService`.

5. Guided flow attempt
   `guided_flow_engine.process()` handles greetings, menu triggers, button transitions, and current flow state.

6. Structured handler attempt
   `structured_query_handler.handle()` handles login, contact, pricing, consultation, blogs, and FAQ requests.

7. RAG invocation
   If earlier layers do not answer, `rag_service.run()` starts retrieval.

8. Query embedding
   `embed_text()` returns a normalized embedding vector.

9. FAISS search
   `faiss_store.search()` returns nearest vector hits.

10. Mongo knowledge lookup
   `rag_service.run()` loads `knowledge_items` from `chatbot_api_knowledge`.

11. Reranking
   Vector scores and keyword overlap are merged.
   Intent-aware penalties and boosts are applied.
   MMR keeps up to three diverse chunks.

12. Hybrid routing
   `_build_hybrid_router_decision()` runs entity detection and decides whether KG should be used.

13. KG retrieval
   `hybrid_retriever.retrieve()` may call `kg_service.query_facts()` if entities and graph relevance are detected.

14. Context build
   `context_builder.build()` creates final context with:
   - `Knowledge Graph Facts:`
   - `Documentation Knowledge:`

15. Answer generation
   Three paths are possible:
   - direct deterministic KG answer from `_answer_from_kg_facts()`
   - deterministic local fallback synthesis from retrieved docs
   - LLM synthesis through `llm_client.stream_chat()`

16. Optional reasoning layer
   If RAG is weak, LLM reasoning is enabled, and the query looks explanatory or follow-up in nature, the pipeline builds a second grounded prompt and streams reasoning output.

17. Finalization
   `_finalize_response_payload()` adds:
   - scroll targets
   - short/full message forms
   - buttons/options
   - learn-more payload
   - safe public metadata

18. API response
   The router returns either:
   - `JSONResponse`
   - or `StreamingResponse` using SSE.

---

--------------------------------------------------

## 5. Indexing System

Simple explanation:
This section explains how raw knowledge becomes searchable chunks and vectors that the chatbot can retrieve at runtime.

Navigation guide:
5.1 How knowledge enters the system
5.2 Where chunking happens
5.3 Where graph-vs-vector separation happens
5.4 Graph-aware chunking
5.5 How FAISS is built
5.6 Where vectors are stored
5.7 Where document mappings are stored
5.8 How incremental indexing works
5.9 Which worker processes pending documents
5.10 Indexing diagrams

--------------------------------------------------

## 5.1 How knowledge enters the system

Knowledge can enter the system through three main paths:

1. Packaged curated seed data
   Source file: `data/seed/mongo_seed.json`
   Loader: `scripts/seed_mongo.py`

2. Curated frontend content ingestion
   Loader: `scripts/ingest_frontend_content.py`

3. Website crawling
   Loader: `scripts/crawl_site.py`

All three paths eventually populate or modify `chatbot_api_knowledge.knowledge_items` in MongoDB.

#

--------------------------------------------------

--------------------------------------------------

## 5.2 Where chunking happens

Chunking happens in different places depending on source:

- Seed data is already pre-chunked in `mongo_seed.json`.
- Crawled website data is chunked in `scripts/crawl_site.py` by `chunk_text()`.
- Knowledge architecture classification already references chunk IDs like `rag_001`, `rag_006`, etc.

#

--------------------------------------------------

--------------------------------------------------

## 5.3 Where graph-vs-vector separation happens

The system uses a preprocessing artifact:

- `data/knowledge_architecture/chunk_classification.json`

This artifact assigns each chunk one of:

- `VECTOR_CANDIDATE`
- `GRAPH_CANDIDATE`
- `FLOW_CANDIDATE`

Meaning:

- `VECTOR_CANDIDATE` chunks should go to FAISS.
- `GRAPH_CANDIDATE` chunks should be converted into graph facts for Neo4j.
- `FLOW_CANDIDATE` chunks are represented as deterministic guided flow states.

#

--------------------------------------------------

--------------------------------------------------

## 5.4 Graph-aware chunking

`scripts/graph_aware_chunking.py` reads `chunk_classification.json`, takes each `GRAPH_CANDIDATE`, extracts the pre-authored `graph_triplets`, flattens them into atomic fact rows, and writes:

- `data/knowledge_architecture/graph_seed.json`
- `data/knowledge_architecture/graph_extraction_report.md`

This is important because one source chunk may contain multiple relations, but Neo4j seeding wants one normalized triplet at a time.

#

--------------------------------------------------

--------------------------------------------------

## 5.5 How FAISS is built

The full FAISS build is implemented in `scripts/build_faiss_index.py`.

Flow:

```text
MongoDB chatbot_api_knowledge.knowledge_items
  â†“
Filter by _should_index_item()
  â†“
Read VECTOR_CANDIDATE policy from chunk_classification.json
  â†“
Embedding generation
  â†“
Normalize embeddings
  â†“
Create clean FAISS IndexFlatIP
  â†“
Reset faiss_vector_map in MongoDB
  â†“
Append vectors through faiss_store.add_vectors()
  â†“
Persist index.faiss
  â†“
Update embedding_status in knowledge_items
```

#

--------------------------------------------------

--------------------------------------------------

## 5.6 Where vectors are stored

Vectors themselves are stored in:

- `data/faiss/index.faiss`

Vector-to-document mapping metadata is stored in:

- MongoDB collection `faiss_vector_map`

Each mapping row includes:

- `index_id`
- `vector_pos`
- `doc_id`
- `active`

#

--------------------------------------------------

--------------------------------------------------

## 5.7 Where document mappings are stored

Document mapping is split:

- FAISS stores only vector positions.
- MongoDB `faiss_vector_map` maps FAISS position to `doc_id`.
- MongoDB `chatbot_api_knowledge.knowledge_items` stores the actual chunk content and metadata.

#

--------------------------------------------------

--------------------------------------------------

## 5.8 How incremental indexing works

Incremental indexing is implemented in `scripts/embedding_worker.py`.

Flow:

```text
Admin or ingestion update modifies knowledge_items
  â†“
knowledge_service.upsert_api_knowledge() sets embedding_status = pending
  â†“
embedding_worker.py polls MongoDB
  â†“
Worker acquires Redis distributed lock
  â†“
Worker claims pending items by setting:
  - embedding_status = processing
  - embedding_owner
  - embedding_claimed_at
  â†“
Worker embeds claimed texts
  â†“
faiss_store.add_vectors() appends them to FAISS
  â†“
MongoDB knowledge_items updated to indexed or failed
```

#

--------------------------------------------------

--------------------------------------------------

## 5.9 Which worker processes pending documents

The worker is:

- `scripts/embedding_worker.py`

It is deployed by:

- `deploy/systemd/ttt-rag-embedding-worker.service`

#

--------------------------------------------------

--------------------------------------------------

## 5.10 Indexing diagrams

#### Full indexing pipeline

```text
Curated Seed / Crawl / Admin Knowledge Update
  â†“
MongoDB chatbot_api_knowledge.knowledge_items
  â†“
Chunk classification policy
  â†“
VECTOR_CANDIDATE filter
  â†“
Embedding generation
  â†“
FAISS IndexFlatIP
  â†“
Persist data/faiss/index.faiss
  â†“
Persist faiss_vector_map in MongoDB
```

#### Incremental indexing worker

```text
knowledge_items with embedding_status = pending
  â†“
Redis lock acquired by embedding_worker.py
  â†“
Claim rows as processing
  â†“
Generate embeddings
  â†“
Append vectors to FAISS
  â†“
Write vector positions to faiss_vector_map
  â†“
Mark knowledge_items as indexed / failed
```

---

--------------------------------------------------

## 6. Knowledge Graph

Simple explanation:
This section explains how structured business entities are stored in Neo4j and how graph lookups support factual answers and guided flows.

--------------------------------------------------

## 6.1 How the graph is structured

The graph is a directed relationship graph seeded from `graph_seed.json`.

Each atomic fact becomes:

```text
(SubjectLabel {name})
  -[:PREDICATE]->
(ObjectLabel {name})
```

Relationships also store:

- `atomic_fact`
- `source_chunk_ids`
- timestamps

#

--------------------------------------------------

--------------------------------------------------

## 6.2 Example node categories visible in artifacts and code

From the graph seed and alias tables, the graph contains labels such as:

- `Service`
- `Platform`
- `Tool`
- `Feature`
- `UseCase`
- `Channel`
- `Company`

Potential domain labels also appear depending on the triplets:

- industry-like labels
- reliability/security control labels
- outcome labels

#

--------------------------------------------------

--------------------------------------------------

## 6.3 Example relationships

From `graph_aware_chunking.py`, `kg_mapper.py`, and `graph_seed.json`, the relationship vocabulary includes:

- `INTEGRATES_WITH`
- `SUPPORTS_USE_CASE`
- `CAPABILITY`
- `DEPLOYED_ON`
- `USES_TOOL`
- `OFFERS`
- `SERVES_INDUSTRY`
- `HAS_AI_USE_CASE`
- `BUSINESS_OUTCOME`
- `HAS_SECURITY_CONTROL`
- `HAS_RELIABILITY_CONTROL`
- `INVOLVES_SERVICE`
- `ACHIEVED_OUTCOME`
- `BUILDS`
- `PRIORITIZES`
- plus runtime mapper support for `BUILT_WITH`, `DEPENDS_ON`

#

--------------------------------------------------

--------------------------------------------------

## 6.4 Which files interact with Neo4j

Runtime Neo4j access:
- `app/kg/kg_service.py`
- `app/kg/kg_queries.py`
- `app/kg/kg_mapper.py`

Graph seeding:
- `scripts/build_knowledge_graph.py`

Graph preprocessing:
- `scripts/graph_aware_chunking.py`

#

--------------------------------------------------

--------------------------------------------------

## 6.5 How KG results are merged with vector search

Merge logic lives in:

- `app/hybrid/hybrid_retriever.py`
- `app/rag/context_builder.py`
- `app/rag/service.py`

Process:

1. RAG selects vector chunks first.
2. Hybrid retriever may query KG.
3. KG facts are deduplicated.
4. `ContextBuilder.build()` preserves KG facts first.
5. Prompt text instructs the LLM to treat KG facts as the primary source of truth.
6. If the query is a direct list-style graph question, `RAGService` may answer directly from KG facts without depending on the LLM.

#

--------------------------------------------------

--------------------------------------------------

## 6.6 Runtime KG query logic

`KGService.query()`:

- canonicalizes entity names
- checks whether KG is enabled
- checks driver availability
- chooses intent-specific relationship types
- partitions service names from target names
- runs a multi-step query plan with timeout
- deduplicates rows
- converts rows to natural-language facts

This design means Neo4j is optional, bounded, and safe to skip.

---

--------------------------------------------------

## 7. Retrieval System

Simple explanation:
This section explains how the chatbot chooses and combines vector search, graph retrieval, and flow-engine decisions during answer generation.

Navigation guide:
7.1 Hybrid retrieval pipeline
7.2 Vector search behavior
7.3 Knowledge graph retrieval behavior
7.4 Flow engine decisions in retrieval
7.5 How the system decides when to use each source

--------------------------------------------------

## 7.1 Hybrid retrieval pipeline

The retrieval architecture is:

```text
User Query
  â†“
Embedding
  â†“
FAISS Search
  â†“
Mongo knowledge lookup
  â†“
Keyword scoring + rerank
  â†“
Intent filtering + MMR
  â†“
Entity detection
  â†“
Hybrid router decision
  â†“
Optional KG retrieval
  â†“
Context build
  â†“
Deterministic answer or LLM synthesis
```

#

--------------------------------------------------

--------------------------------------------------

## 7.2 Vector search behavior

Vector search is always the first retrieval step inside RAG.

Implemented in:
- `app/rag/embeddings.py`
- `app/rag/vector_store.py`
- `app/rag/service.py`

Vector search is responsible for:
- semantic similarity
- broad coverage
- explanatory content
- long-form business and service descriptions

#

--------------------------------------------------

--------------------------------------------------

## 7.3 Knowledge graph retrieval behavior

KG retrieval is conditional.

Implemented in:
- `app/kg/entity_detection.py`
- `app/kg/kg_service.py`
- `app/hybrid/hybrid_retriever.py`
- `app/rag/service.py`

KG retrieval is triggered when:
- detected intent is graph-relevant such as integrations, tool lookup, platform lookup, or relationship lookup
- or entity labels include `Platform`, `Tool`, or `Service`

#

--------------------------------------------------

--------------------------------------------------

## 7.4 Flow engine decisions in retrieval

The flow engine does not participate inside the RAG service itself, but it affects retrieval by short-circuiting before RAG.

The pipeline order is:

```text
Cache
  â†“
Flow Engine
  â†“
Structured Handler
  â†“
RAG
```

This means retrieval runs only for unresolved queries.

#

--------------------------------------------------

--------------------------------------------------

## 7.5 How the system decides when to use each source

Use flow when:
- the user is in a menu state
- the input is a guided button click
- the message matches a configured trigger or greeting/menu command

Use structured handler when:
- the message is clearly asking for login, contact, pricing, consultation, blogs, or FAQ info

Use RAG vector retrieval when:
- the request is informational and not handled by flow or structured logic

Use KG in addition to vector search when:
- entity detection finds graph-relevant entities and intent

Use deterministic KG answer instead of LLM when:
- KG facts are present and the query is list-style

Use LLM synthesis when:
- retrieval produced grounded context and either streaming or concise synthesis is desired

Use reasoning layer when:
- LLM is enabled
- reasoning is enabled in settings
- RAG produced a weak or fallback result
- the query looks explanatory, comparative, or follow-up in nature

---

--------------------------------------------------

## 8. Databases and Storage

Simple explanation:
This section explains what each storage system keeps and why the architecture splits data across MongoDB, Neo4j, FAISS, and Redis.

--------------------------------------------------

## 8.1 MongoDB

MongoDB is the main operational data store.

Primary collections:

- `chatbot_api_knowledge`
  Stores the editable API knowledge document.
  Contents:
  - `business_profile`
  - `plans`
  - `knowledge_items`
  - `about`
  - `updated_at`
  - `version`

- `chatbot_guided_flow`
  Stores the editable guided flow document.
  Contents:
  - `flow_config`
  - `updated_at`
  - `version`

- `faiss_vector_map`
  Stores FAISS vector position to document mapping.
  Contents:
  - `index_id`
  - `vector_pos`
  - `doc_id`
  - `active`

- `chat_metrics`
  Stores usage and source tracking for requests.

Compatibility collections:

- `business_profile`
- `plans`
- `rag_documents`

These support legacy tooling and fallback data assembly in `KnowledgeService`.

#

--------------------------------------------------

--------------------------------------------------

## 8.2 Neo4j

Neo4j stores the structured knowledge graph.

What it stores:
- service nodes
- platform nodes
- tool nodes
- feature nodes
- use-case nodes
- channel nodes
- other domain entities represented by graph triplets

Relationships store:
- relationship type
- `atomic_fact`
- `source_chunk_ids`
- timestamps

#

--------------------------------------------------

--------------------------------------------------

## 8.3 FAISS

FAISS stores semantic embeddings for vector retrieval.

What it stores:
- dense normalized vectors for eligible `knowledge_items`

What it does not store:
- full document text
- metadata labels
- Mongo document structure

Those remain in MongoDB.

#

--------------------------------------------------

--------------------------------------------------

## 8.4 Redis

Redis stores ephemeral runtime state.

What it stores:
- chat response cache entries
- KG fact cache entries
- guided flow session state
- embedding worker distributed lock

#

--------------------------------------------------

--------------------------------------------------

## 8.5 Storage responsibility summary

```text
MongoDB
  - editable knowledge
  - flow config
  - vector mappings
  - usage metrics
  - compatibility collections

Neo4j
  - exact graph facts
  - service/platform/tool relationships
  - source chunk lineage on relationships

FAISS
  - retrieval embeddings only

Redis
  - cache
  - session state
  - worker coordination
```

---

--------------------------------------------------

## 9. Server Startup

Simple explanation:
This section explains what the API process initializes when the server starts and what stays lazy until a request needs it.

--------------------------------------------------

## 9.1 API server startup flow

Implemented in `app/main.py`.

```text
Process start
  â†“
Load settings
  â†“
setup_logging()
  â†“
Create FastAPI app
  â†“
Register middleware and router
  â†“
startup() event fires
  â†“
validate_startup_settings()
  â†“
redis_manager.connect()
  â†“
mongo_manager.connect()
  â†“
faiss_store.warmup()
  â†“
guided_flow_engine.warmup()
  â†“
warmup_entity_detector()
  â†“
_get_model()
  â†“
warmup_embeddings()
  â†“
Service ready
```

#

--------------------------------------------------

--------------------------------------------------

## 9.2 What gets initialized at startup

- Structured JSON logging
- Redis client
- MongoDB client and indexes
- FAISS index and vector mapping
- Guided flow cache
- spaCy entity detector if available
- Embedding model or deterministic fallback path

#

--------------------------------------------------

--------------------------------------------------

## 9.3 What is not initialized until needed

- Neo4j driver is lazy in `KGService._get_driver()`
- LLM calls do not happen until a request actually needs synthesis or reasoning

#

--------------------------------------------------

--------------------------------------------------

## 9.4 Shutdown flow

```text
Shutdown event
  â†“
redis_manager.close()
  â†“
mongo_manager.close()
  â†“
kg_service.close()
  â†“
llm_client.close()
```

---

--------------------------------------------------

## 10. Architecture Diagrams

Simple explanation:
This section provides visual maps of the main system flows so developers can understand the architecture quickly before reading code details.

--------------------------------------------------

## 10.1 High Level System Architecture

```text
Frontend / Website
  â†“
FastAPI API Layer
  Files: app/main.py, app/router.py
  â†“
Chat Pipeline Controller
  File: app/pipeline.py
  â†“
Decision Layers
  â”œâ”€ Cache
  â”‚   Files: app/cache/*
  â”œâ”€ Guided Flow
  â”‚   Files: app/flow_engine/*
  â”œâ”€ Structured Handler
  â”‚   File: app/structured_handler/handler.py
  â””â”€ RAG / Hybrid Retrieval
      Files: app/rag/*, app/hybrid/*, app/kg/*
          â†“
          LLM Client
          File: app/llm_client/client.py
```

#

--------------------------------------------------

--------------------------------------------------

## 10.2 RAG Retrieval Pipeline

```text
User Query
  â†“
embed_text()
  File: app/rag/embeddings.py
  â†“
faiss_store.search()
  File: app/rag/vector_store.py
  â†“
keyword scoring + rerank + MMR
  File: app/rag/service.py
  â†“
detect_entities()
  File: app/kg/entity_detection.py
  â†“
kg_service.query_facts() if relevant
  File: app/kg/kg_service.py
  â†“
hybrid_retriever.retrieve()
  File: app/hybrid/hybrid_retriever.py
  â†“
context_builder.build()
  File: app/rag/context_builder.py
  â†“
LLM synthesis or deterministic hybrid answer
  File: app/rag/service.py
```

#

--------------------------------------------------

--------------------------------------------------

## 10.3 Indexing Pipeline

```text
Seed Data / Crawled Content / Admin Knowledge Update
  â†“
MongoDB chatbot_api_knowledge.knowledge_items
  â†“
chunk_classification.json
  â”œâ”€ VECTOR_CANDIDATE â†’ FAISS
  â”œâ”€ GRAPH_CANDIDATE  â†’ graph_seed.json â†’ Neo4j
  â””â”€ FLOW_CANDIDATE   â†’ guided flow design / deterministic answers
```

#

--------------------------------------------------

--------------------------------------------------

## 10.4 Query Processing Pipeline

```text
User Query
  â†“
Router
  â†“
Pipeline
  â†“
Cache hit? -------------------- yes â†’ return cached payload
  â†“ no
Guided flow hit? -------------- yes â†’ return flow response
  â†“ no
Structured handler hit? ------- yes â†’ return structured response
  â†“ no
RAG retrieval
  â†“
Grounded answer strong enough? - yes â†’ return RAG result
  â†“ no
Reasoning enabled and needed? - yes â†’ call LLM reasoning stream
  â†“ no
Return fallback / weak RAG result
```

#

--------------------------------------------------

--------------------------------------------------

## 10.5 Data Storage Architecture

```text
MongoDB
  - chatbot_api_knowledge
  - chatbot_guided_flow
  - faiss_vector_map
  - chat_metrics
  - business_profile
  - plans
  - rag_documents

Neo4j
  - graph nodes
  - graph relationships
  - atomic_fact
  - source_chunk_ids

FAISS
  - dense semantic embeddings

Redis
  - response cache
  - KG cache
  - flow session state
  - embedding worker lock
```

---

--------------------------------------------------

## 11. Runtime Rules

Simple explanation:
This section lists the key runtime rules that keep retrieval, flow orchestration, and response generation consistent in production.

1. Flow beats RAG.
   The pipeline intentionally checks the guided flow engine before any retrieval.

2. Structured beats RAG.
   Contact, login, pricing, and FAQ-style answers are deterministic first.

3. Vector retrieval happens before KG merge.
   KG enriches vector retrieval; it does not replace it.

4. KG facts are prompt-priority evidence.
   Context builder and prompt construction always put graph facts first.

5. LLM is not the first layer.
   The LLM consumes grounded context after retrieval, not before.

6. Reasoning is fallback-only.
   It is used only for weaker RAG cases when enabled.

7. Mongo is the editable source of truth.
   FAISS and Neo4j are derived serving indexes.

8. Incremental indexing relies on `embedding_status`.
   Admin writes mark items `pending`, and the worker turns them into FAISS vectors.

9. Neo4j is optional at runtime.
   If KG is disabled or unavailable, hybrid retrieval safely degrades to vector-only retrieval.

10. Response shaping is a first-class subsystem.
   The final user-facing payload is not a raw retrieval answer; it is normalized by `app/pipeline.py` into UI-safe forms.
--------------------------------------------------

--------------------------------------------------

--------------------------------------------------

## 12. Book Index

Simple explanation:
This index helps developers quickly locate important concepts and jump to the section where each one is explained.

API Layer .................... Section 2.1
Cache ........................ Section 2.14
Chunking ..................... Section 5.2
Context Builder .............. Section 2.11
Databases .................... Section 8
Embeddings ................... Section 2.6
Entity Detection ............. Section 2.9
FAISS ........................ Sections 2.7, 5.5, 8.3
File Intelligence ............ Section 3
Flow Engine .................. Sections 2.3, 7.4
Guided Flow .................. Sections 2.3, 4.2
Hybrid Retrieval ............. Sections 2.8, 7.1
Indexing ..................... Section 5
Knowledge Graph .............. Sections 2.10, 6
LLM Integration .............. Section 2.12
MongoDB ...................... Sections 2.15, 8.1
Neo4j ........................ Sections 6, 8.2
Query Router ................. Sections 2.2, 4.2
RAG .......................... Sections 1.4, 2.5, 7
Redis ........................ Sections 2.14, 8.4
Response Formatting .......... Section 4.2
Retrieval .................... Section 7
Server Startup ............... Section 9
Structured Handler ........... Sections 2.4, 4.2
User Query Flow .............. Section 4
Vector Search ................ Sections 2.7, 7.2
Worker ....................... Sections 2.17, 5.9
