--
-- PostgreSQL database dump
--

\restrict 33CEWNvTXCrvRk0AejqUqXeHsVGV6aCi4F1oLPisspsgKtdMf9zfQvlPLYqt9Qg

-- Dumped from database version 16.11 (74c6bb6)
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: _system; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA _system;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: replit_database_migrations_v1; Type: TABLE; Schema: _system; Owner: -
--

CREATE TABLE _system.replit_database_migrations_v1 (
    id bigint NOT NULL,
    build_id text NOT NULL,
    deployment_id text NOT NULL,
    statement_count bigint NOT NULL,
    applied_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: replit_database_migrations_v1_id_seq; Type: SEQUENCE; Schema: _system; Owner: -
--

CREATE SEQUENCE _system.replit_database_migrations_v1_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: replit_database_migrations_v1_id_seq; Type: SEQUENCE OWNED BY; Schema: _system; Owner: -
--

ALTER SEQUENCE _system.replit_database_migrations_v1_id_seq OWNED BY _system.replit_database_migrations_v1.id;


--
-- Name: investments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.investments (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    user_id character varying NOT NULL,
    type character varying NOT NULL,
    name character varying NOT NULL,
    amount character varying NOT NULL,
    invested_date date NOT NULL,
    status character varying DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess jsonb NOT NULL,
    expire timestamp without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying DEFAULT gen_random_uuid() NOT NULL,
    email character varying,
    first_name character varying,
    last_name character varying,
    profile_image_url character varying,
    date_of_birth date,
    phone character varying,
    address text,
    city character varying,
    state character varying,
    pincode character varying,
    occupation character varying,
    annual_income character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    financial_goal character varying,
    goal_timeline character varying
);


--
-- Name: replit_database_migrations_v1 id; Type: DEFAULT; Schema: _system; Owner: -
--

ALTER TABLE ONLY _system.replit_database_migrations_v1 ALTER COLUMN id SET DEFAULT nextval('_system.replit_database_migrations_v1_id_seq'::regclass);


--
-- Data for Name: replit_database_migrations_v1; Type: TABLE DATA; Schema: _system; Owner: -
--

COPY _system.replit_database_migrations_v1 (id, build_id, deployment_id, statement_count, applied_at) FROM stdin;
1	29fcbca5-1501-4954-9931-cc8486afe5c9	719c611c-d36e-4dae-984a-2d928baebdf0	2	2025-12-20 23:52:20.596934+00
\.


--
-- Data for Name: investments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.investments (id, user_id, type, name, amount, invested_date, status, created_at) FROM stdin;
4e768c74-ab0e-423f-a61e-5a47a1c01cd0	50897233	term-insurance	Term Life Insurance	0	2025-12-21	active	2025-12-21 00:13:28.438865
385f4730-4071-4547-aee7-c280810936ea	50897233	mutual-funds	Mutual Fund SIP	10000	2025-12-11	active	2025-12-21 00:13:28.397683
5b8e1199-2ab6-4fea-aebc-3249a5aac21e	50897233	health-insurance	Health Insurance Premium	200000	2025-12-21	active	2025-12-21 00:13:28.47147
385f4730-4071-4547-aee7-c280810936eb	50897233	mutual-funds	SBI Premium	20000	2025-12-09	active	2025-12-21 00:20:19.079999
751503f5-f908-4147-88ba-6af5f4c86242	51159722	health-insurance	Health Insurance Premium	0	1970-01-01	active	2025-12-21 01:36:45.847034
03a3d035-2a55-493e-9dfd-489267cef7da	51159722	mutual-funds	Nippon Mutual fund	100000	2025-12-18	active	2025-12-21 01:36:45.76992
40fbf5e8-e0a0-4519-9a14-b18591ee681a	51159722	term-insurance	Max Life Insurance	500000	2025-12-10	active	2025-12-21 01:36:45.808813
34e3275c-3267-474a-9883-d9d620cbe4d0	51655930	mutual-funds	SBI Mutual Fund SIP	10000	2025-12-19	active	2025-12-21 07:12:14.851223
1ff28bb8-6d57-49b8-9863-8d3129006b22	51655930	term-insurance	Max Life Insurance	200000	2025-12-18	active	2025-12-21 07:12:14.88895
62d1e720-fedd-45da-bbfc-ae8093bbc335	51655930	health-insurance	Star Health Insurance Premium	10000	2025-12-16	active	2025-12-21 07:12:14.919118
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (sid, sess, expire) FROM stdin;
7hnss3I2mGWHPVsKqgOFkDunrhN2eHd4	{"cookie": {"path": "/", "secure": true, "expires": "2025-12-28T01:36:44.209Z", "httpOnly": true, "originalMaxAge": 604800000}, "passport": {"user": {"claims": {"aud": "be24ff2c-6a5b-45c6-b6c0-a968235da9c3", "exp": 1766284604, "iat": 1766281004, "iss": "https://replit.com/oidc", "sub": "51159722", "email": "abhishekghayre.iitb@gmail.com", "at_hash": "l6eLfduluyauSPWPK5E6dg", "username": "abhishekghayrei", "auth_time": 1766281003, "last_name": null, "first_name": null}, "expires_at": 1766284604, "access_token": "V_vtqyM1aP3a-VLnDGtU99WqP6fwjAHHQhIKlepyBTt", "refresh_token": "WtBQsy5j9yY6Q7je6HqvWmbS_JIpsbDURFNIMuNx4U-"}}}	2025-12-28 16:58:46
uv50yTFbCoORaZPilRq6dweBPLW96l5-	{"cookie": {"path": "/", "secure": true, "expires": "2025-12-28T06:44:54.660Z", "httpOnly": true, "originalMaxAge": 604800000}}	2026-01-01 17:06:04
LsScuDBj1F-N48YKqA_qlJ9TqkVzdJYx	{"cookie": {"path": "/", "secure": true, "expires": "2025-12-28T07:12:11.639Z", "httpOnly": true, "originalMaxAge": 604800000}, "passport": {"user": {"claims": {"aud": "be24ff2c-6a5b-45c6-b6c0-a968235da9c3", "exp": 1766304731, "iat": 1766301131, "iss": "https://replit.com/oidc", "sub": "51655930", "email": "dishikaghayre433@gmail.com", "at_hash": "QHZQ6hzP4LRTJWqjXQE36w", "username": "dishikaghayre43", "auth_time": 1766301128, "last_name": null, "first_name": null}, "expires_at": 1766304731, "access_token": "QQruxK8zdOL_Mome548d07q33v6GNNDOvs2cbOpkQcw", "refresh_token": "JdXTDokrYbBB9d97S3hcvTTazlU8c2kPFxjlT0AioSZ"}}}	2025-12-28 07:45:09
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, email, first_name, last_name, profile_image_url, date_of_birth, phone, address, city, state, pincode, occupation, annual_income, created_at, updated_at, financial_goal, goal_timeline) FROM stdin;
50897233	ghayre.abhishek25@gmail.com	Abhishek	Ghayre	\N	2001-06-13	+919890054580	Global City\n402/M-12	Virar	Maharashtra	401303	engineer	10-25 Lakhs	2025-12-11 18:33:50.912998	2025-12-21 01:36:18.286	5	10-15 Years
51159722	abhishekghayre.iitb@gmail.com	kirti	Ghayre	\N	1990-04-24	9699261219	hgnjgo	fmklsf	Maharashtra	sfjlkf	en	10-25 Lakhs	2025-12-21 00:00:36.757256	2025-12-21 01:37:08.236	40	10-15 Years
51655930	dishikaghayre433@gmail.com	diss	thebest	\N	2008-02-20	9766630057	ehiqwuhuifb 	PALGHAR	Maharashtra	401303	teacher	3-5 Lakhs	2025-12-21 07:12:11.576342	2025-12-21 07:31:35.63	100	1-3 Years
\.


--
-- Name: replit_database_migrations_v1_id_seq; Type: SEQUENCE SET; Schema: _system; Owner: -
--

SELECT pg_catalog.setval('_system.replit_database_migrations_v1_id_seq', 1, true);


--
-- Name: replit_database_migrations_v1 replit_database_migrations_v1_pkey; Type: CONSTRAINT; Schema: _system; Owner: -
--

ALTER TABLE ONLY _system.replit_database_migrations_v1
    ADD CONSTRAINT replit_database_migrations_v1_pkey PRIMARY KEY (id);


--
-- Name: investments investments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (sid);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_replit_database_migrations_v1_build_id; Type: INDEX; Schema: _system; Owner: -
--

CREATE UNIQUE INDEX idx_replit_database_migrations_v1_build_id ON _system.replit_database_migrations_v1 USING btree (build_id);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.sessions USING btree (expire);


--
-- Name: investments investments_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict 33CEWNvTXCrvRk0AejqUqXeHsVGV6aCi4F1oLPisspsgKtdMf9zfQvlPLYqt9Qg

