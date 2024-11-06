--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: barangay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.barangay (
    barangay_id integer NOT NULL,
    barangay_name character varying(100) NOT NULL,
    latitude character varying(100),
    longitude character varying(100),
    population integer NOT NULL
);


ALTER TABLE public.barangay OWNER TO postgres;

--
-- Name: barangay_barangay_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.barangay_barangay_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.barangay_barangay_id_seq OWNER TO postgres;

--
-- Name: barangay_barangay_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.barangay_barangay_id_seq OWNED BY public.barangay.barangay_id;


--
-- Name: business; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.business (
    business_id integer NOT NULL,
    business_name character varying(150) NOT NULL,
    address character varying(150),
    barangay_id integer,
    subarea_id integer,
    latitude numeric(9,6),
    longitude numeric(9,6),
    smetype_id integer,
    category_id integer,
    subcategory_id integer
);


ALTER TABLE public.business OWNER TO postgres;

--
-- Name: business_business_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.business_business_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.business_business_id_seq OWNER TO postgres;

--
-- Name: business_business_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.business_business_id_seq OWNED BY public.business.business_id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id integer NOT NULL,
    category_name character varying(100) NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.category_category_id_seq OWNER TO postgres;

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- Name: smetype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.smetype (
    smetype_id integer NOT NULL,
    smetype_name character varying(28) NOT NULL
);


ALTER TABLE public.smetype OWNER TO postgres;

--
-- Name: smetype_smetype_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.smetype_smetype_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.smetype_smetype_id_seq OWNER TO postgres;

--
-- Name: smetype_smetype_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.smetype_smetype_id_seq OWNED BY public.smetype.smetype_id;


--
-- Name: subarea; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subarea (
    subarea_id integer NOT NULL,
    subarea_name character varying(100) NOT NULL,
    barangay_id integer
);


ALTER TABLE public.subarea OWNER TO postgres;

--
-- Name: subarea_subarea_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subarea_subarea_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subarea_subarea_id_seq OWNER TO postgres;

--
-- Name: subarea_subarea_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subarea_subarea_id_seq OWNED BY public.subarea.subarea_id;


--
-- Name: subcategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subcategory (
    subcategory_id integer NOT NULL,
    subcategory_name character varying(100) NOT NULL,
    parent_category_id integer
);


ALTER TABLE public.subcategory OWNER TO postgres;

--
-- Name: subcategory_subcategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subcategory_subcategory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subcategory_subcategory_id_seq OWNER TO postgres;

--
-- Name: subcategory_subcategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subcategory_subcategory_id_seq OWNED BY public.subcategory.subcategory_id;


--
-- Name: barangay barangay_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.barangay ALTER COLUMN barangay_id SET DEFAULT nextval('public.barangay_barangay_id_seq'::regclass);


--
-- Name: business business_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business ALTER COLUMN business_id SET DEFAULT nextval('public.business_business_id_seq'::regclass);


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: smetype smetype_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.smetype ALTER COLUMN smetype_id SET DEFAULT nextval('public.smetype_smetype_id_seq'::regclass);


--
-- Name: subarea subarea_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subarea ALTER COLUMN subarea_id SET DEFAULT nextval('public.subarea_subarea_id_seq'::regclass);


--
-- Name: subcategory subcategory_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategory ALTER COLUMN subcategory_id SET DEFAULT nextval('public.subcategory_subcategory_id_seq'::regclass);


--
-- Data for Name: barangay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.barangay (barangay_id, barangay_name, latitude, longitude, population) FROM stdin;
100	Baclaran	14.2437902	121.1666991	15164
200	Banaybanay	14.2549061	121.1261241	40936
300	Banlic	14.2320444	121.1379848	11496
400	Bigaa	14.2854411	121.1291807	14235
500	Butong	14.2866091	121.1379688	14764
600	Casile	14.2102098	121.046295	3794
700	Diezmo	14.2446617	121.1077938	6622
800	Gulod	14.2604196	121.151496	17873
900	Mamatid	14.2394158	121.1488688	56761
1000	Marinig	14.2689068	121.1513741	56154
1100	Niugan	14.2591488	121.124512	87645
1200	Pittland	14.230713	121.0893643	4733
1300	Poblacion 1	14.2801664	121.1210509	7025
1400	Poblacion 2	14.2791602	121.1220417	2108
1500	Poblacion 3	14.274068	121.1199166	4274
1600	Pulo	14.2438978	121.1266072	36444
1700	Sala	14.2700855	121.121534	10903
1800	San Isidro	14.238823	121.1348569	30509
\.


--
-- Data for Name: business; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.business (business_id, business_name, address, barangay_id, subarea_id, latitude, longitude, smetype_id, category_id, subcategory_id) FROM stdin;
1	Cariñoso Food Services	#20 AMPERE ST.	700	703	14.230344	121.094027	3	800	802
2	Labadabest Laundry House	BLK 120 LOT 27	900	913	14.239184	121.158900	2	1200	1208
3	M A Commercial Space Leasing	#245	1600	1614	14.245187	121.130409	2	200	211
4	Abundans Grains Marketing Corp.	#210	300	308	14.228499	121.138779	1	1500	1504
5	Leigene Automotive Care Services	#7055 BES	1700	1713	14.271136	121.123016	2	100	101
6	Jaylu Food Services	#4 HOLOGRAM ST	700	703	14.234496	121.107911	3	800	802
7	Hca Hauling Service		900	924	14.237333	121.150972	2	1700	1705
8	Alfamart Trading Philippines, Inc.	LOT 3444	200	212	14.250360	121.129136	2	200	211
9	Alfametro Marketing, Inc.	LOT 3444	200	212	14.250318	121.129087	1	1500	1502
10	Alpha Bazaars & Concepts, Inc.	CENTRO MALL	1600	1614	14.242370	121.131227	2	200	211
11	U.P. Therapy Center	2ND FLR COMERCIO CENTRAL	1600	1614	14.241783	121.131431	2	900	916
12	Anamorphic Experiences Studio Inc.	BLK 38 LOT 16	200	209	14.250614	121.127766	2	400	402
13	Haven`S Payment Center	BLK 45 LOT 32 PH9	1100	1110	14.271665	121.143555	2	700	710
14	Haven`S Pharmacy	BLK 45 LOT 32 PH9	1100	1110	14.271666	121.143531	3	900	912
15	R.A. Arcilla Construction Supplies Trading	BLK 12 LOT 1-2	300	302	14.228053	121.137506	2	200	203
16	Aaape Corporation	BLK 4 LOT 2 RLI BLDG. 2	200	216	14.242765	121.113480	2	200	211
17	Rhalcantara Hauling Services	ABDON HARDWARE	200	212	14.252924	121.128590	2	1700	1705
18	Cristina A. Dizon-Alinsunurin Dental Clinic	BLK 151 LOT 1	900	913	14.227832	121.139381	2	900	902
19	Alemania Dental Clinic	#93	400	407	14.284253	121.127662	2	900	902
20	Mavia Online Shop	BLK 23 LOT 61 PH 3	1000	1011	14.273652	121.143929	1	1500	1512
21	Arjoy Renzie Online Shop	BLK 10 LOT 16 PH 2	1000	1011	14.271672	121.143549	1	1500	1512
22	Dzign Stckr Online Shop	BLK 23 LOT 61 PH 3	1000	1011	14.271671	121.143453	1	1500	1512
23	Joel&April Paresan	#49	200	212	14.255523	121.128261	3	800	808
24	Trivias Shappu Online Shop	BLK 23 LOT 61 PH 3	1000	1011	14.271676	121.143415	1	1500	1512
25	Prince Sticka Zone Online Shop	BLK 23 LOT 110 PH3	1000	1011	14.271688	121.143355	1	1500	1512
26	Melisa`S Sari-Sari Store	BLK 39 LOT 127 PH8	1100	1110	14.271702	121.143536	1	1500	1513
27	Alaon Bakery	BLK 1 LOT 74	200	210	14.256628	121.131230	1	1500	1504
28	M.C.A Cafeteria	#190 M.L. QUEZON ST	1300	1307	14.279046	121.123521	3	800	812
29	M&C Pharmacure Drugmart (Valuemed Generics Pharmacy)	UNIT 107 GF BLDG2 SALA BUSINESS CENTER	1700	1723	14.273778	121.119807	3	900	912
30	Grace Printing Services	ELSOL MARKET	1500	1502	14.277442	121.120913	2	400	404
31	Giomax Vulcanizing Shop	BLK 1 LOT 25	200	210	14.256383	121.130119	2	100	107
32	Danilo & Cathy Dressed Chicken Store		500	502	14.289681	121.135502	1	1800	1807
33	Luckyventure88 Construction Materials Trading	BLK 3 LOT 9 WON EXT.	500	509	14.279959	121.136426	1	1500	1509
34	Jc Sign Advertising Displays Manufacturing	#128	300	308	14.230037	121.137730	2	400	401
35	Jnj Hardware	BLK 2 LOT 10 PH 1	900	905	14.238373	121.155529	1	1500	1509
36	Solesky Construction	#1	300	308	14.230000	121.137784	2	200	203
37	Doc Fayds Dental Clinic	UNIT 2 BLK 50 LOT 2 PH 3	500	508	14.282020	121.137188	2	900	902
38	Balmes-Baterisna Dental Clinic	#6	300	307	14.235213	121.157827	2	900	902
39	Right Smile Dental Clinic	BLK 11 LOT 3 MASAGANA ST.	200	210	14.250586	121.127278	2	900	902
40	Delfino-Baltazar Dental Clinic	#19 J.P. RIZAL ST.	1500	1503	14.274691	121.124397	2	900	902
41	Becis Bioenergy (Philippines) Corporation	C/O NESTLE PHILIPPINES	1100	1103	14.260779	121.125782	2	200	202
42	Pedals N Gulong Bike Shop	UNIT 2 CEDRO BLDG #5365	300	317	14.229637	121.142064	1	1500	1516
43	B-Mirk Enterprises Corporation	2ND FLR UNIT 9 EASTLAND PROPERTY BLDG 2	1600	1608	14.243016	121.131408	2	1400	1407
44	Jake Rhiana Furniture Shop		300	312	14.231109	121.136757	2	1200	1204
45	Paotian Herbal Food Supplement Trading	BLK 180 LOT 9-F	900	913	14.238658	121.162070	1	1500	1510
46	E.M.B. Construction	BLK 16 LOT 35 GUMAMELA ST	1600	1620	14.244833	121.119123	2	200	203
47	Teleclick. Mobile Phones And Accessories Store	WALTERMART CABUYAO KM. 47	300	311	14.232881	121.134842	1	1500	1503
48	El Diente Dental Clinic	#33	1800	1822	14.238196	121.133322	2	900	902
49	Powercraft Review Center And Consultancy Services	BLK 16 LOT 31	1600	1601	14.241524	121.127953	2	1400	1406
50	Gerald Food Hub  ( Happy Manok )	#168	1800	1822	14.242477	121.142057	3	800	812
51	Power Blues General Merchandise	BLK 1 LOT 10 PH 1 	200	211	14.264324	121.144153	1	1500	1507
52	Golden.Star Manpower Services	BLK 2 LOT 49 PH 1	1000	1001	14.274708	121.150623	2	1400	1407
53	Winair Electrical Rewinding Services		300	312	14.231065	121.136792	2	100	106
54	Clcd Consumer Goods Trading	#101 	200	212	14.252994	121.128615	1	1500	1514
55	Casper E-Cigarettes Co.	#218 	300	308	14.229941	121.137836	1	1500	1515
56	Cncm Homebuilders Construction Trading	UNIT 5-B LS SQUARE BLDG	1700	1713	14.272282	121.121507	1	1500	1506
57	Bz Therapy Center	UNIT 4-B HILARY COMMERCIAL CENTER	1800	1822	14.244337	121.139583	2	900	916
58	Lcda Delivery Services	BLK 5 LOT 8 PH 2 	1600	1609	14.239822	121.123109	2	1700	1703
59	Rbcleantek Environment Consultancy Services	BLK 21 LOT 15	200	201	14.253770	121.137594	2	1400	1406
60	Lcdch20 Water Refilling Station	#101 	200	212	14.252883	121.128599	1	1500	1517
61	Gsc Meat Products Trading	#11 	200	212	14.252858	121.128634	1	1500	1504
62	J.M.C Pet Supplies And Accessories Trading	BLK 1 LOT 12 PH 1	500	508	14.285073	121.137771	1	1500	1515
63	J.M.C Rice Store	BLK 1 LOT 12 PH 1	500	508	14.285072	121.137771	1	1500	1504
64	Casa Moriones Catering Services, Inc.	ADMIN PARK BLDG	700	703	14.236572	121.101880	3	800	803
65	Celedonio Salon	BLK 1 LOT 9 	900	930	14.240781	121.156863	2	1300	1303
66	Rl Pod Consumer Goods Retailing	BLK 26 LOT 14 	900	919	14.240154	121.148881	1	1500	1507
67	Herlene Laundry Services	BLK 1 LOT 30	200	210	14.256444	121.130278	2	1200	1208
68	Printpink Souvenir Shop	BLK 27 LOT 57	200	207	14.248692	121.124147	1	1500	1515
69	Gielyn Apartment	BLK 8 LOT 15 	200	204	14.252974	121.131787	2	200	201
70	Ezekhiel Grilling Station ( Marinduqueños Litson Manok )	#1 BES	300	308	14.229892	121.137873	1	1500	1504
71	San`S Cafe	BLK 180 LOT 7-G	900	913	14.236952	121.157813	3	800	804
72	Tooth Power Dental Clinic	#85	1800	1822	14.238961	121.136219	2	900	902
73	Austria-Cuarteros Dental Care Clinic	BLK 80 LOT 53	100	103	14.242236	121.168572	2	900	902
74	Riccast Online Shop	BLK 24 LOT 3	1000	1011	14.271571	121.143778	1	1500	1512
75	Macdecalz Online Shop	BLK 23 LOT 110 PH 3	1000	1011	14.271828	121.143423	1	1500	1512
76	Krisvinclark Vulcanizing Shop		800	801	14.259935	121.153334	2	100	107
77	Gabventures Pharmacy ( Farmacia Ni Dok )	UNIT B BLK 15 LOT 1 KATAPATAN AVE.	200	210	14.257536	121.134664	3	900	912
78	Yeye-Kai`S Milktea Station ( Booba Milk Tea )	#21 JP RIZAL ST. 	1700	1708	14.271216	121.125883	3	800	809
79	Andrea`S Learning And Development Center	BLK 1 LOT 56	200	210	14.256644	121.131299	2	500	506
80	Madizelle 2 Food And Beverage Kiosk (Godo)		200	216	14.242594	121.112928	3	800	808
81	Dcm Global Technologies Inc.	KM. 47 RFM ROAD	1600	1622	14.250325	121.130717	1	1500	1507
82	146 Lomi House		600	602	14.179246	121.024740	3	800	812
83	Ejurie Sari-Sari Store	BLK 23 LOT 19 PH1 	1000	1001	14.274656	121.150666	1	1500	1513
84	Pillars Mineral`S Clay And Sand Pits Quarrying	BLK 3 LOT 4 GUIJO ST. 	1600	1603	14.242820	121.129524	1	1500	1509
85	Rm Auto Repair Shop	BLK 6 LOT 2 PH 2-A	500	508	14.281420	121.135670	2	100	101
86	Jb Dressed Chicken Store	#80 	500	502	14.289723	121.135268	1	1800	1807
87	Cilio & Rey Hardware	#121	100	106	14.246753	121.169467	1	1500	1509
88	E&J Beverage Shop	BLK 19 LOT 19 PH 2	200	211	14.262590	121.144543	3	800	811
89	Dengemsan Incorporated (Generika)	BLK 206 LOT 35	900	913	14.236638	121.157817	3	900	912
90	Dulay Consumer Goods Store	#180 M.H. DEL PILLAR ST.	1400	1405	14.276790	121.125701	1	1500	1507
91	Doctor Ngipin Dental Clinic	BLK 1 LOT 7 PH 1	1000	1012	14.268574	121.159117	2	900	902
92	Idl Medical Laboratory And Dental Clinic	665	1000	1009	14.275077	121.139543	2	900	902
93	Abdsbuilders Construction	BLK 3 LOT 1 CORNER RD LOT 2 & ROAD LOT 4	200	216	14.242047	121.112466	2	200	203
94	Rjr De Leon`S Dental Clinic	#237	300	317	14.227844	121.139001	2	900	902
95	Rjr De Leon`S Dental Clinic	#764 	800	811	14.268392	121.154833	2	900	902
96	Deña Commercial Space Rental	#87	1800	1822	14.242072	121.142241	2	200	211
97	Alfred And Daisy Dressed Chicken And Meat Shop	#87 	1800	1812	14.244371	121.139484	1	1500	1504
98	Chingguya Mini Store	BLK 17 LOT 10 	1700	1722	14.271941	121.125626	1	1500	1513
99	Clearwater 1 Water Refilling Station	#574 	900	925	14.238975	121.172237	1	1500	1517
100	Mhel Home Massage Services	BLK 148 LOT 1 	900	913	14.238634	121.162070	2	1300	1305
101	Drgc Vape Shop		300	313	14.229188	121.138275	1	1500	1515
102	Drgc Printing Services		300	313	14.229845	121.137935	2	400	404
103	Mud. Coffee House	#2 JP RIZAL ST	1700	1708	14.273638	121.125018	3	800	804
104	C & E Bigaa Hardware Trading	 	400	408	14.286106	121.128964	1	1500	1509
105	Espinoza Apartments		200	208	14.256922	121.136109	2	200	214
106	F.U.S.E Salon Supplies Trading	#253	1600	1622	14.240411	121.132405	1	1500	1510
107	Jnr Poultry Supplies	#88	200	217	14.251718	121.128696	1	1500	1515
108	Quatro Marias Food Hub ( N`Grande Special Halo Halo )	#003 FB BAILON ST.	1700	1720	14.272390	121.124857	3	800	811
109	Duque-Esleta Dental Clinic	BLK 20 LOT14 	1800	1816	14.235725	121.136431	2	900	902
110	Tri Point Builders		1700	1707	14.266370	121.128351	2	200	203
111	Melb Cellphone And Accessories Trading	CENTRO MALL PULO	1600	1614	14.242361	121.131173	1	1500	1503
112	I-Connect Information Services	#258 OSMEÑA ST.	1300	1310	14.276533	121.126933	2	1000	1010
113	Fore Carama Cargo Solution Inc.		1100	1109	14.262008	121.134093	2	1700	1706
114	Boskain Food And Beverage Kiosk ( Mi Pastil )	CENTRO MALL PULO	1600	1614	14.242736	121.131078	1	1500	1504
115	Firmus Marketing Corporation	BLK 2 LOT 3 & 4 GYRO ST.	700	703	14.235959	121.105804	2	200	219
116	Fh Business Tax Consultancy Services Co.	2 FLR. WMH BLDG.	300	308	14.230069	121.137891	2	1400	1406
117	Mmcomia Dental Clinic	#537 NENA B. ARANSANZO COMMERCIAL BLDG. 	1100	1103	14.260143	121.127839	2	900	902
118	Aklan Hardware	#232	800	809	14.256486	121.166620	1	1500	1509
119	First East Resources Inc.	FAST CARGO COMPOUD	1600	1617	14.247024	121.136741	1	1800	1803
120	Dezel Property Leasing	LOT 1871-B	1000	1014	14.275055	121.139400	2	200	211
121	Althea`S Sari-Sari Store	#125 A. BONIFACIO ST.	1400	1401	14.277060	121.124622	1	1500	1513
122	Gl Murang Gamot Et Cetera Pharmacy (Valuemed Generics Pharmacy)	BLK 130 LOT 26 	900	913	14.238835	121.157820	3	900	912
123	Ghp Construction Opc	BLK 3 LOT 5 	1100	1111	14.263795	121.127419	2	200	203
124	Rollie Rice Store	BLK 41 LOT 143 PH 8 	1100	1110	14.271665	121.143520	1	1500	1507
125	Ksg Arkibuild Architectural Design Services	BLK 37 LOT 99 PH 9 	1100	1110	14.271713	121.143602	2	1400	1408
126	Waterfalls Water Refilling Station	BLK 30 LOT 34 PH 1 	900	905	14.238369	121.155508	1	1500	1517
127	A`Go Laundry House	BLK 8 LOT 71 	200	207	14.249939	121.128579	2	1200	1208
128	Guarino Optical Clinic	#121 A. BONIFACIO ST.	1400	1401	14.276927	121.124141	3	900	911
129	Geneciran Dental Clinic	#415	900	924	14.237692	121.168835	2	900	902
130	Tabuco Wood Works	#33-A	1800	1822	14.244360	121.139556	1	1100	1117
131	Herbie`S Catering And Events Opc	2ND FLOOR LIMBELL BUSINESS CENTER	1500	1503	14.275021	121.124312	3	800	803
132	Frantastic Laundry Shop	UNIT 1-A DP HEALZ APT. C.T.	1500	1504	14.275137	121.125621	2	1200	1208
133	Peñalfor-Hermoso Consumer Goods Trading	BLK 11 LOT 50 	1600	1602	14.245105	121.137389	1	1500	1507
134	Double H Liquefied Petroleum Gases Wholesaling	#137 J.P. RIZAL ST.	1700	1708	14.273962	121.125049	1	1800	1808
135	Rosarian Hlh Mini Grocery		1700	1717	14.270260	121.126342	1	1500	1508
136	House Land Development Corporation		1700	1723	14.266568	121.118045	2	200	218
137	Eats-A-Rap Food Hub		300	313	14.229911	121.137914	3	800	808
138	Mikniah Gasoline Station	BLK 38 LOT 2 	1100	1110	14.271707	121.143543	3	100	104
139	Aoi Dry Goods Store	BLK 41 LOT 143 PH 8 	1100	1110	14.271732	121.143579	1	1500	1513
140	Information Evolution (Philippines) Inc.	BLK 7 LOT 5 PH 2-B 	300	303	14.228890	121.136475	2	1000	1005
141	Inspecit Inc.	C/O NESTLE PHILIPPINES	1100	1103	14.262764	121.127422	2	200	204
142	Jncc Grocery Products Distribution Opc	WAREHOUSE 8 	200	205	14.253398	121.130376	3	1800	1806
143	Rsj Soap And Detergent Trading	#264 	1600	1614	14.239798	121.132402	1	1500	1511
144	Michelle Residential Apartment Rental	#284 	100	106	14.244522	121.170166	2	200	201
145	Jiao Dental Clinic	BLK 10 LOT 10 BAILON ST. 	1700	1720	14.272528	121.124390	2	900	902
146	Jessley Aircool Solutions Corporation	BLK 5 LOT 6  IPIL ST. 	1600	1603	14.242822	121.129508	2	200	221
147	Jdj Rice Store		1700	1710	14.275827	121.128708	1	1500	1504
148	Grateful Beginnings Medical Clinic And Lying In		900	923	14.235400	121.158439	2	900	908
149	Tokyo Japan Auction Home And Office Furniture Trading		1600	1614	14.242953	121.132138	1	1500	1515
150	Kla Courier Express Co.	#7055 BES 	1700	1713	14.271084	121.122990	2	1700	1702
151	Kasipag Microfinancing Inc.	UNIT 5 JMJ BLDG. & BLK 17-D LOT 12	300	306	14.234359	121.135685	2	700	703
152	Food Retailing Stall Dsl Storecart	BLK 5 LOT 6 PH 2 	1000	1012	14.269201	121.159527	1	1500	1507
153	Le Renovatio Corporation (Hen Lin)	WALTERMART CABUYAO KM. 47	300	311	14.232692	121.134626	1	1500	1504
154	Yeng`S Sari-Sari Store	BLK 14 LOT 95 	1000	1011	14.271813	121.143745	1	1500	1513
155	Lagua`S Fish Stand		1400	1402	14.277286	121.123589	1	1500	1504
156	Risenn Street Sneakerz Sports Apparel Trading	UNIT 111 ANNIJO LAND DEVELOPMENT & LEASING CORPORATION	1700	1713	14.273668	121.120091	1	1500	1501
157	Narvaja Laurel Dental Clinic	#236 J.P. ST.	1300	1302	14.278589	121.122869	2	900	902
158	Dentlite Dental Clinic	#239 M.L. QUEZON ST.	1400	1406	14.276994	121.124893	2	900	902
159	Lazanas Dental Clinic	UNIT 10 2ND FLR. LIMBELL BLDG. 	1500	1503	14.275123	121.124277	2	900	902
160	Ozeno Property Leasing	BLK 7 LOT 5 	300	303	14.229031	121.136417	2	200	211
161	Youpapashop Online Shop	BLK 24 LOT 30 PH 3 	1000	1011	14.271657	121.143461	1	1500	1512
162	Junalyn Luay ..Yakult Beverage Trading	BLK 7 LOT 6 PH 2 	1000	1012	14.269217	121.159480	1	1500	1507
163	Ozeno Human Resource Management Consultancy	BLK 7 LOT 5 	300	303	14.227212	121.135324	2	1400	1406
164	Jmr Variety Store	BLK 5 LOT 6 PH 2 	1000	1012	14.269163	121.159500	1	1500	1507
165	Thecapital Ofsilog And Sizzling Restaurant	#132	1100	1112	14.262340	121.127370	3	800	812
166	Lichi Electric, Incorporated		700	703	14.236294	121.101351	3	1800	1812
167	I Learn Driving School	COMERCIO CENTRALE	1600	1614	14.241723	121.131612	2	500	501
168	Rentomatic Transportation Services	BLK 5 LOT 16 	1600	1610	14.250038	121.135314	2	1700	1701
169	Kiddie Stuffs Baby Products Store	BLK 5 LOT 3 	1800	1821	14.243727	121.142320	1	1500	1512
170	Geekeez Sportswear Shop	#183 	200	212	14.252979	121.128697	1	1500	1501
171	Fjl Engineering Services	BLK 13 LOT 8 PH 3	1800	1809	14.235304	121.122706	2	1400	1410
172	Mapolon Dental Clinic	# 47	1600	1622	14.247035	121.129975	2	900	902
173	Decal World Printing Services	UNIT 103 DCK BLDG. BLK 1-D LOT 10 	300	306	14.234382	121.135815	2	400	404
174	Avl`S Digicrafts Digital Printing Services	BLK 26 LOT 16 	800	813	14.259585	121.151162	2	400	404
175	Herb And Angel Motor Vehicle Repair Services	BLK 130 LOT 26 	900	913	14.239030	121.158923	3	100	101
176	Alfamike Sari-Sari Store	BLK 48 LOT 217 PH 11 	1100	1110	14.271677	121.143498	1	1500	1513
177	Medpure Pharmaceutical Company Inc.		300	308	14.230091	121.137926	3	900	912
178	Trixcy`S Beauty Lounge	#28	1800	1822	14.238262	121.133610	2	1300	1303
179	Jim&Luz Sari-Sari Store	BLK 16 LOT 20 PH 2 	1800	1811	14.236566	121.123265	1	1500	1513
180	Gifted Hands 1 Maternity Clinic	BLK 130 LOT 24 	900	913	14.241730	121.162845	2	900	908
181	Mr. Eggscellent Food Distribution Corp.	BLK 29 LOT 8 PH 1	300	315	14.237752	121.138335	1	1800	1807
182	Jam`S Carwash And Detailing Services	BLK 4 LOT 8 	1700	1703	14.271088	121.125125	2	100	103
183	Nhan`S Bakery	BLK 35 LOT 32	1000	1012	14.269177	121.159561	1	1500	1504
184	Mdelatorre Technologies Corporation		1600	1614	14.242150	121.112474	1	1100	1113
185	Teodora A. Marasigan Dental Clinic		1400	1403	14.277085	121.123436	2	900	902
186	Mora Dental Clinic	#71	1800	1822	14.238387	121.133991	2	900	902
187	Maisondemarga Hotel Supplies Trading	BLK 19 LOT 25 	200	204	14.252998	121.131864	1	1500	1515
188	Gdm Gadgets Shop	#45 	1800	1808	14.241930	121.131791	1	1500	1503
189	Gelkk Trucking Services	BLK 30 LOT 318 	900	919	14.242956	121.151108	2	1700	1711
190	Jerroll Footwear Trading	#39-A 	1800	1822	14.244313	121.139602	1	1500	1501
191	Eguel Vulcanizing Shop	#75 	200	212	14.254145	121.128489	2	100	107
192	Miyo-San Online Shop	BLK 23 LOT 61 PH 3 	1000	1011	14.271805	121.143600	1	1500	1512
193	Milden Glass Installation Services	BLK 22 LOT 159 	900	920	14.240223	121.149710	2	1100	1108
194	Gabriella Online Shop	#0597 	900	927	14.240189	121.171300	1	1500	1512
195	Ezekiel House Rental	BLK 91 LOT 1 	900	912	14.242289	121.168603	2	200	217
196	Bongbong Nevado Construction	BLK 7-A LOT 20 GERONA ST. 	300	306	14.234424	121.135971	2	200	203
197	Mhiles Logistics Services	BLK 9 LOT 27 	800	817	14.261815	121.151829	2	1700	1706
198	Laurence Sari-Sari Store	BLK 45 LOT 30 PH 11 	1100	1110	14.273666	121.143925	1	1500	1513
199	Asianpedicab Consumer Goods Retailing	BLK 6-C LOT 5 SORIA ST. 	300	306	14.234512	121.136202	1	1500	1504
200	Twinhouse Pharmacy	BLK 66 LOT 5 	1600	1602	14.245018	121.137428	3	900	912
201	Ajbn Scrap Trading		1600	1615	14.249043	121.132373	1	1500	1515
202	New Nemar Development Corporation	#1102 	300	311	14.232483	121.135549	1	1500	1516
203	Bliss Motorcycle Parts And Accessories Shop	0059 FR BLK 1 ST. 	200	210	14.256123	121.128698	1	1500	1516
204	St. Martin De Porres Const And Demolition Services	#184 	1700	1723	14.266579	121.117984	2	200	203
205	Operario`S Canteen	#91 MABINI ST. 	1300	1305	14.280082	121.124638	3	800	802
206	El-B Sari-Sari Store	#83	1100	1112	14.262756	121.126648	1	1500	1513
207	V. San Juan Dental Clinic	2ND FLOOR MB AGUIRRE BUILDING J.P. RIZAL ST.	1400	1404	14.277277	121.123632	2	900	902
208	Imee Toga Dental Clinic	#53 	300	311	14.235371	121.134360	2	900	902
209	Jun Paresan		300	312	14.230940	121.136747	1	1500	1504
210	D`One Transport Services	BLK 1 LOT 11 PH 2	1600	1601	14.241554	121.127979	2	1700	1710
211	Jakkk Ice Cream House	BLK 4 LOT 1 	200	210	14.256123	121.128679	1	1500	1504
212	Clarito Punongbayan Dental Clinic	#263 	1700	1723	14.268369	121.126708	2	900	902
213	St. Peregrine Dental Clinic	145	1600	1614	14.245944	121.130326	2	900	902
214	Jkep Delivery Services	#295 	1300	1309	14.280471	121.124502	2	1700	1703
215	Herb & Angel Motor Vehicle Parts And Accessories Shop	BLK 1 LOT 18 	200	210	14.256268	121.129601	1	1500	1516
216	Phil K-Plex Parts And Supply Corp.	1ST FLR. GM JOE BLDG. PUROK 5	1700	1713	14.266540	121.127185	1	1500	1516
217	Premier Screwking Bolts & Nuts Corp.	UNIT 108 & 109 GROUND FLR. SALA BUSINESS CENTER	1700	1713	14.273754	121.120022	1	1500	1509
218	Rodenas-Potente Dental Clinic	BLK 21 LOT 55 MAINGAT ST. 	200	210	14.261850	121.132799	2	900	902
219	Amalia L. Padilla Dental Clinic	BLK 111 LOT 9 	900	913	14.242089	121.164238	2	900	902
220	Smile Focus Dental Center		1700	1719	14.266260	121.127073	2	900	902
221	Smileville Dental Clinic	CEDRO BLDG.	300	317	14.229647	121.142018	2	900	902
222	Jolly Smile Dental Clinic	BLK 7-A LOT 8 	1600	1611	14.240451	121.132151	2	900	902
223	Hazel Fashion Shop	MALVAR ST.	1300	1306	14.278227	121.125239	2	1200	1213
224	Djr Land Transport Services	B7 L11 	1800	1820	14.241340	121.141358	2	1700	1710
225	Simpatiko Space Rental	BLK 1 LOT 2 PH 6 	900	929	14.237800	121.147002	2	200	211
226	Zmk Meat Shop	BLK 211 LOT 31 	900	913	14.238708	121.162070	1	1500	1504
227	Stranded Arts And Crafts Trading	BLK 21 LOT 12 	1600	1612	14.240342	121.132219	1	1500	1512
228	Gidgid Refreshment (Zagu)	CART B G/F 	200	216	14.242632	121.113008	3	800	811
229	Zytech Industrial Engineering Service	BLK 27 LOT 27 	1000	1001	14.274358	121.150638	2	1400	1410
230	Rnd Prime Development Corporation	UNIT 10 SALA BUSINESS CENTER	1700	1713	14.273766	121.119725	2	200	207
231	Rite Way Airconditioning & Refrigeration Corporation	BLK 2-D LOT 12 AJJD BLDG. 	300	306	14.234558	121.136406	1	1500	1511
232	Jnbricz Grocery Products Trading		1500	1502	14.277448	121.120868	1	1500	1513
233	Miko`S Rtw Store	SOUTH EMERALD DISTRIBUTION INC.	300	317	14.228845	121.139587	1	1500	1501
234	Cel/ Andy`S Fruit Stand	#87	1800	1822	14.244350	121.139476	1	1500	1504
235	Daniella Grace Dry Goods Store		1400	1402	14.277373	121.123636	1	1500	1507
236	Par Geotechnical Testing Center	#206 	1800	1815	14.242452	121.143002	2	1400	1410
237	Trevi Bakeshop	BLK 2 LOT 9  	1700	1703	14.275212	121.132570	1	1500	1504
238	Bubble N Klean Laundry Shop	MAIN ROAD 	900	902	14.236677	121.166007	2	1200	1208
239	`Cvr` Car Aircon Repair Services	#25 	300	308	14.236100	121.134163	2	100	101
240	Jo-Len & 3J Poultry Supply	333	800	808	14.260823	121.164930	1	1500	1515
241	Aquaclear Water Distribution Services	M&C COMMERCIAL BLDG.	300	306	14.234602	121.136553	1	1500	1517
242	M.J.Joshua`S Consumer Goods Store	BLK 5 LOT 12 PH 2 	1000	1012	14.269182	121.159553	1	1500	1507
243	Alr Kitchen Equipment Repair And Maintenance Services	BLK 73 LOT 6 	900	920	14.240215	121.149710	2	1200	1207
244	Cloudy`S Food Products	BLK 10 LOT 4 PH 4 	500	508	14.281442	121.135746	1	1100	1105
245	Ride-N-Rent Car Rental Services	BLK 35 LOT 52 PH 3 	900	906	14.242725	121.156755	2	1700	1701
246	Tuon Tutorial Services	BLK 1-D LOT 5 VALENCIA ST. 	300	306	14.234141	121.135684	2	500	506
247	Rodas Construction Services	BLK 4 LOT 1 PH 2 	900	902	14.238750	121.165651	2	200	203
248	Stanford Asia College Inc.	J.P. RIZAL	1500	1503	14.274645	121.124706	2	500	503
249	Tp-Prime Steel Works	#667 	1000	1010	14.264839	121.162480	2	100	102
250	Jd Construction Materials Trading	BLK 7 LOT 5 	300	309	14.229465	121.141692	1	1500	1509
251	Jes Rice Retailing	BLK 15 LOT 1 SAMPAGUITA ST.	1600	1620	14.244946	121.119037	1	1500	1504
252	Veyptacy Vape Shop	#73 	200	212	14.254097	121.128648	1	1500	1515
253	Scrt Library Cafe	#177 	200	212	14.250397	121.129180	3	800	812
254	838 Fashion Boutique	#178 	200	212	14.250318	121.129168	1	1500	1501
255	3A Sewing Shop	BLK 16 LOT 168 	900	915	14.242972	121.151087	2	1200	1213
256	Nene Sari-Sari Store	#456	1700	1723	14.266514	121.118044	1	1500	1513
257	Truejoys Food Services	 BLK 4 LOT 2 UNIT GROUND FLR. RLI BLDG. 2	200	216	14.242878	121.113324	3	800	812
258	Zerca`S Simplsya Grill And Restaurant	BLK 5 LOT 12 	1700	1703	14.270544	121.125133	3	800	812
259	`Henry` Welding Shop		1700	1702	14.275953	121.126929	2	100	102
260	Shantahl Direct Sales Inc.	UNIT 10 2ND FLR. K1 BLDG. 221 BENT ST.	300	303	14.228482	121.138651	1	1500	1510
261	C.C.S Trucking Services	BLK 3 LOT 4 PH 2 	1600	1601	14.241577	121.128042	2	1700	1711
262	Synergyone Manpower Services Inc.	LAMCRES BLDG. 216 	300	317	14.228819	121.138684	2	1400	1407
263	Rms Klay Sewing Services	BLK 16 LOT 6 PH 2 	1800	1811	14.237892	121.122708	2	1400	1404
264	Hking88 Cctv Trading		1600	1614	14.248507	121.129535	1	1500	1503
265	Clydann Online Shop	BLK 4 LOT 3 PH 1 	1000	1001	14.274676	121.150623	1	1500	1512
266	Monkeyko Car Care Center	UNIT 11 GBRDI BLDG. PARKING LOT	1600	1606	14.242873	121.133737	2	100	101
267	Goldmond Painting Services	BLK 191 LOT 3 PH 2 	900	913	14.238702	121.162034	2	100	101
268	Kol`S Engineering Services	#134 	200	212	14.251589	121.128773	2	1400	1410
269	Wlan Trading And Construction Supply	#133 SAN BMI BLDG.	300	317	14.230280	121.137343	1	1800	1809
270	Tita Sion Kutsara At Tinidor Food Concession Services	BLK 5 LOT 1 BINARY ST. -PEZA	700	703	14.234944	121.095690	3	800	807
271	Meler Auto Supply	 #3 1ST FLOOR AGGASID BLDG.	300	317	14.236919	121.133582	1	1500	1516
272	`Quick Movers` Logistics Services	BLK 5 LOT 27 	400	401	14.277725	121.129885	2	1700	1706
273	Vljj Commercial Space Rental		300	313	14.229962	121.137832	2	200	211
274	Truck-Star Logistics Corp.	UNIT 305 3RD FLR. THE CENTRALE & LOT 1 BLK 2 COR. RD. LOT 2 & RD LOT 4 	200	216	14.241895	121.112609	2	1700	1706
275	Testech, Inc.	UNIT 118 SALA BUSINESS CENTER BLDG.	1700	1713	14.273821	121.119867	2	200	221
276	Coffee Ground Coffee Shop	A PREMIER LEASING CORP.  BLDG.	1700	1713	14.272781	121.125344	3	800	804
277	Jrt Consumer Goods Trading		600	602	14.180079	121.025653	1	1500	1514
278	Aya Dry Goods Store	PILMART MARKET	300	313	14.228962	121.139101	1	1500	1507
279	Tremtech Engineering Services	BLK 8 LOT 39 PH 2 	300	315	14.237815	121.138484	2	1400	1410
280	Gohann & Gotenn Sari-Sari Store	BLK 30 LOT 30 PH 6 	1100	1110	14.271649	121.143515	1	1500	1513
281	Gohann Sari-Sari Store	BLK 1 LOT 8 PH 1 	200	211	14.264739	121.144001	1	1500	1513
282	Aideline B. Toledo Dental Clinic	#32 J.P. RIZAL ST.	1500	1503	14.274027	121.124687	2	900	902
283	Tongco Dental Clinic	#150 	300	317	14.229048	121.138188	2	900	902
284	Dentistico Dental Clinic	BLK 5 LOT 21 PH 5-A 	800	816	14.266652	121.158664	2	900	902
285	The Smoking Joint Vapeshop Retail Opc	#64 	1600	1614	14.245945	121.130083	1	1500	1515
286	The Smoking Joint Vapeshop Retail Opc	#83 	300	308	14.234155	121.134902	1	1500	1515
287	Jvj Smile And Care Tooth Clinic Dental Clinic	BLK 207 LOT 43 	900	913	14.235318	121.157847	2	900	902
288	Jvj Smile And Care Tooth Clinic Dental Clinic	BLK 68 LOT 10 	900	920	14.237504	121.147153	2	900	902
289	Pring Trucking Services		1700	1721	14.267409	121.126823	2	1700	1711
290	Kasakrema Ice Cream Station	UNIT 101 SALA BUSINESS CENTER	1700	1723	14.272581	121.122323	1	1500	1504
291	Perscents Official Perfume Trading	#81	1800	1822	14.238517	121.134506	1	1500	1510
292	Vso Holdings Inc.	ROOM 403 THE CENTRALE BLDG.	200	216	14.242122	121.112612	2	700	705
293	Doctor Panda Dental Clinic		1700	1713	14.270663	121.123950	2	900	902
294	St. Vincentius Ferreri Dental Clinic	#110 	1800	1822	14.239484	121.137636	2	900	902
295	Kenneth B. Velasco Pharmacy	BLK 55 LOT 162 	1100	1110	14.271746	121.143625	3	900	912
296	Jovie`S Sari-Sari Store	BLK 16 LOT 41 	1600	1602	14.245073	121.137486	1	1500	1513
297	Mebz Rtw Shop	J.P RIZAL ST.	1300	1302	14.276697	121.123682	1	1500	1501
298	St3Z Property Leasing		300	313	14.229960	121.137849	2	200	215
299	Ficatech Precision Metal Fabrication	B3 L11 	900	930	14.240770	121.156820	2	1100	1102
300	Mmdmm Bills Payment	BLK 39 LT 20 	1600	1602	14.244625	121.137856	2	700	708
301	Macjim Furniture Designs Inc.	BLK 17 LOT 32 	1600	1601	14.241528	121.127914	1	1500	1506
302	Marinie Trading	B23 L25 	1600	1602	14.244336	121.132911	1	1500	1507
303	Choco Avenue Food Products	#605 	1100	1103	14.257974	121.127824	1	1500	1507
304	Good Grains Rice Supply	B180 LOT 7-B 	900	913	14.236710	121.157813	1	1500	1507
305	Rrc Food Service	#361 	100	104	14.244084	121.170184	3	800	801
306	G3M Engineering Design And Trading	3RD FLOOR K-BUILDING BLK1 LOT 13 COMMERCIAL	300	306	14.234198	121.135869	1	1500	1507
307	Mody Enterprises	BLK 7 LT 24 PH-3 PUROK 5	1000	1012	14.269212	121.159443	2	1100	1104
308	Alphamerc Trading Corporation (Chick N` Juicy)	#77 	1800	1822	14.238874	121.135495	1	1500	1504
309	Nrc Trans - Movers Inc.	BLOCK 5 LOT 22 23 24 	1600	1616	14.246178	121.125109	2	1700	1710
310	Hsn Bearing Supply	#54 	300	311	14.235352	121.134365	1	1500	1507
311	St. Ignatius Technical Institute Of Business And Arts Inc.	#3447 	200	212	14.250068	121.129366	2	500	503
312	Jcaj Cooling Solutions	#14	1600	1622	14.248384	121.129351	2	1200	1211
313	Mediwell Pharmacy	BLK1 LOT 9 PH1 	200	211	14.264714	121.144009	3	900	912
314	Herwin And Julie Kk Metal Scrap Trading	#180 	1700	1723	14.266541	121.118115	1	1500	1515
315	Guisokians Travel And Tours	BLK 3 LT 27 EXT	900	912	14.242583	121.165960	2	1600	1603
316	Jump Ahead Systems And Trading Incorporated	BLK 3 LT 1 PH3	1000	1012	14.268035	121.159397	2	200	209
317	Artac`S Construction Services	BLK4 LOT15-17 PH4 	1600	1607	14.249881	121.139341	2	200	221
318	Kuya Adrian Store	#30-B RFM ROAD	1600	1622	14.248539	121.129780	1	1500	1513
319	Andok`S Litson Corporation	BLK 1 LOT 1 	1000	1013	14.277862	121.145502	1	1500	1504
320	Regn Purified Drinking Water	512	900	931	14.235594	121.161271	1	1500	1517
321	Rpjh Motorcycle Parts And Accessories Shop	#279	1600	1622	14.239257	121.132907	1	1500	1516
322	L.L. Pastor Scrap Trading		800	801	14.259917	121.153431	1	1500	1515
323	Urban Denim Makers Inc. (Exhibit)	WALTERMART CABUYAO KM. 47	300	311	14.232534	121.134702	1	1500	1501
324	4 Axes Construction Supplies	#161	1600	1622	14.249032	121.132370	1	1500	1509
325	Rreb Enterprises	BLK 7 LOT 2  	1800	1801	14.241984	121.142562	1	1500	1507
326	Fv Amigos Trading	#73 	1500	1504	14.275004	121.125096	1	1500	1507
327	Unilever Philippines, Inc.	PULO - DIEZMO RD (FAST SERVICES CORP.CPD.)	1600	1617	14.239416	121.117755	2	1700	1713
328	Clarenz General Merchandise	BLK 25 LOT 45 	100	103	14.242655	121.169373	1	1500	1507
329	K2 Capital Holdings Corp.	BLK2 LOT3 & 4 GYRO ST.	700	703	14.235869	121.105781	2	200	219
330	Cht Capital Resources, Inc.	BLK2 LOT 3&4 GYRO ST. 	700	703	14.236080	121.105778	2	200	219
331	Gravus Industries, Inc.	LOT 3&4 GYRO ST. 	700	703	14.236166	121.105829	1	1100	1113
332	Igi Wash Laundromat	#211 	300	313	14.228921	121.138340	2	1200	1208
333	Gabrielle Erica Trading	#727 	1700	1702	14.273409	121.129192	1	1800	1807
334	Motoglittz Tools Trading	BLK 21 LOT 34 	200	210	14.261043	121.133103	1	1500	1507
335	Asa Philippines Foundation, Inc. (A Microfinance Ngo)	BLK7 LOT30 	1800	1811	14.237877	121.122701	2	700	703
336	Rigosa Group Co.	LUCKY 88 BLDG. 3RD FLOOR 	300	313	14.230041	121.137807	2	1400	1406
337	Qualifirst Management Consultancy Services	BLK22 LOT12 OVIEDO ST. 	300	306	14.234266	121.136122	2	1400	1406
338	Ccd (Cabuyao Concrete Development) Corporation		1100	1109	14.261992	121.134096	1	1100	1113
339	Precious Treasures Christian School Of Cabuyao, Inc.	BLK 38 LOT 55/57 	1600	1602	14.244979	121.137362	2	500	503
340	Renzy E-Cash Payment Center	BLOCK 42 LOT 87 	1100	1110	14.271642	121.143510	2	700	708
341	Jdclanor Rice Store	BLOCK 42 LOT 77 	1100	1110	14.271697	121.143679	1	1500	1507
342	Lucky Sunrise Glass And Metal Works	BLK 25 LOT 4 EXEC	900	919	14.242966	121.151060	2	1100	1108
343	Royal Cablevision Corporation		1700	1713	14.272095	121.125423	2	1000	1009
344	Jomel`S Meat Shop	BLK 206 LOT 31 	900	913	14.241868	121.163367	1	1500	1504
345	Mjmd Labadali Laundry Shop		400	406	14.282555	121.126808	2	1200	1208
346	Perpet Pilipinas Corp. ( 7 -  Eleven )	ROTONDA	1700	1721	14.267999	121.126709	1	1500	1502
347	Cvm Finance And Credit Corporation	#199 J.P. RIZAL ST.	1300	1302	14.279719	121.122488	2	700	707
348	Palawan Pawnshop And Palawan Express Pera Padala	113	300	308	14.228664	121.138811	2	700	709
349	G-Tech Integrated Systems, Inc.	BLK-7 LOT-2 SOUTHPOINT ROAD GPS BLDG. 	200	216	14.243802	121.114156	3	1800	1812
350	Gnbtl Corporation	BLK 1 LOT 8 	200	216	14.243978	121.110895	2	1700	1711
351	Rmpro Rigging Services	B13 L1 P2	300	303	14.228653	121.135684	2	1700	1705
352	Jamerc Trading		900	931	14.237410	121.150977	1	1800	1814
353	Lbc Express, Inc.	GF U-10 BLDG.B CITY PARKWAYS COMM`L CTR. KATAPATAN ROAD	200	212	14.252910	121.128716	2	1700	1702
354	Ym Cargo Transport Corp. (Yctc)		1600	1617	14.241840	121.121168	2	1700	1705
355	Abdmed Pharmacy	KAVITEHAN ROAD	800	806	14.259691	121.151712	3	900	912
356	Glee`S P.O.G.I. Buko Shake	BLK 26 LOT 7	900	919	14.240386	121.149345	3	800	811
357	Nasabe Rm Petroleum Corporation	2ND FLR UNIT 207	1800	1802	14.238004	121.132748	1	1100	1113
358	Palawan Pawnshop And Palawan Express Pera Padala	224 UNIT 6 ZONE 29	1100	1112	14.262795	121.126854	2	700	709
359	C.Obispo Builders	BLK 7 LOT 21 	1600	1601	14.241432	121.127928	2	200	202
360	Rodelfred C. Turiana Variety Store		1400	1402	14.277388	121.123747	1	1500	1504
361	South Star Drug, Inc.	PUROK 3 	300	307	14.228685	121.139997	3	900	912
362	Joseph Delmo Car Airconditioning Services	193 NIEVES BASACA ST.	400	414	14.286534	121.129308	2	100	101
363	Printeria Printing Services	BLK 3 LOT 14 	1000	1011	14.277122	121.145529	2	400	404
364	Quianna Enterprises	BLK 17 LOT 14 	200	204	14.253045	121.131964	2	1700	1711
365	Glomin Industrial Trading	BLK 1 LOT 27 PH2	1600	1601	14.246474	121.132376	1	1500	1509
366	Elitetech Farm Solutions, Inc.	#78 	1800	1822	14.238763	121.135781	1	1800	1812
367	Cliberduche Corporation		1600	1614	14.244222	121.130307	2	200	211
368	Fc Ducusin Real Estate Leasing	BLK 6 LOT 1 	1800	1801	14.241979	121.142565	2	200	211
369	Blu Electrical Services	B4 L21 	1000	1003	14.278123	121.141138	2	200	205
370	White House Store	#86	1800	1822	14.242057	121.142248	1	1500	1502
371	Elsol Realty And Development Corporation	FELIX DRIVE ELSOL PLAZA	1500	1502	14.277081	121.123416	2	200	206
372	Cedarc Engineering And Development Consultancy Services	BLK 20 LOT 20 PH 3 	300	306	14.234328	121.136272	2	1400	1406
373	Jaba Foodlab Mfg. Corp.	WAREHOUSE 2 	200	205	14.254460	121.129999	1	1100	1105
374	Cellboy Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232529	121.134807	1	1500	1503
375	Autobody Technologies Corp.	UNIT F 	1800	1804	14.239370	121.133743	1	1100	1113
376	Lynville Land Development Corporation		1000	1014	14.274827	121.139562	2	200	219
377	Lbc Express, Inc.	BLK 1 LOT 14 PH 4 	900	930	14.235549	121.157692	2	1700	1702
378	Jtb Business Center	#237  NATIONAL HIGHWAY	300	313	14.228684	121.139936	2	200	211
379	Goldilocks Bakeshop, Inc.	SAVEMORE MARKET	300	308	14.227912	121.138437	1	1500	1504
380	Heavynne And Angel`S Transport Services	#099 	1000	1005	14.274977	121.139808	2	1700	1710
381	Idnsys Corporation	BLK 117 LOT 10 	900	913	14.238678	121.162026	3	1000	1003
382	Nitty Gritty Accessories Articles Wholesaling	BLK 6 LOT 6 PH 1 BAMBOO ST. 	300	303	14.229016	121.137476	1	1800	1812
383	Bsouth Bicycle Trading	OHC BLDG.	300	311	14.232369	121.135685	1	1500	1516
384	Tri Fats And Oils, Inc.	LOT 7 	1200	1204	14.230145	121.092241	3	1800	1816
385	Jobelle Rtw	BLK 38 LOT 3 PH 2 	500	508	14.281466	121.135807	3	1500	1501
386	Advanstar Company, Inc.		1700	1713	14.271017	121.123062	3	1800	1806
387	Teabros Corporation Doing Business Under The Name And Style Of Chatime	WALTERMART CABUYAO KM. 47	300	311	14.232587	121.135094	3	800	809
388	Aop Electronics Center	BLK 25 LOT 9 	900	919	14.240867	121.150876	1	1500	1516
389	Rey-Loren Food Haus	WALTERMART CABUYAO KM. 47	300	311	14.232725	121.135182	3	800	811
390	Man-Ar Auto Repair Shop		1600	1617	14.242298	121.117386	2	100	101
391	Albert Shuttle Service	#186 M.L. QUEZON ST.	1300	1307	14.279590	121.123432	2	1700	1709
392	Countryside Veterinary Services	#109-A CENTENNIAL PLAZA	1800	1802	14.238007	121.132763	2	900	917
393	Aqua Nash Water Refilling Station	BLK 11 LOT 13 BLUEGRASS ST.	300	302	14.228009	121.137364	1	1500	1517
394	Vanlake Truck Parts Corporation		1600	1617	14.241108	121.117730	1	1500	1516
395	Kymejill Transport Services	BLK 3 LOT 37 PH 1 	200	211	14.264269	121.144714	2	1700	1710
396	Rfg Warehouse		1700	1719	14.268345	121.129176	3	1800	1802
397	Ashdreiris Transport Services	BLK 16 LOT 14 ANTHURIUM ST. 	1600	1620	14.244957	121.119084	2	1700	1710
398	Jc Arandia Trucking Services	BLK1 LOT19  PHASE 2 CROWN ASIA 	1800	1805	14.239436	121.123526	2	1700	1711
399	Edmylene Delivery Services	B8 L13 PH2 VIA COSENZA ST.	1600	1609	14.238926	121.123635	2	1700	1710
400	Roger And Andrea Rice Store	B2 L1 	1600	1602	14.245056	121.137572	1	1500	1513
401	San Bmi Commercial Space Rental	#0133 	300	312	14.231015	121.136863	2	200	211
402	Jbatallones Trucking Services	#583	1100	1108	14.262758	121.126646	2	1700	1711
403	Jay Es Ele Heavy Equipment Repair Services	#260-A 	1800	1822	14.244277	121.139572	2	100	101
404	Building Skills Learning And Therapy Center	#83 	1100	1112	14.263628	121.127191	2	900	914
405	Che Buono Restobar	CBD BUILING 	1600	1614	14.246341	121.130192	3	800	813
406	Seoul-Meat Samgyupsal Grill House		1500	1504	14.274853	121.124657	3	800	812
407	Single Boy Egg And Rice Trading	BLK4 LOT16 	1800	1816	14.237765	121.137223	1	1500	1504
408	Single Boy Egg And Rice Trading	BLK4 LOT16 	1800	1816	14.235697	121.136415	1	1500	1504
409	Aleine Trucking Services	BLK-8A LOT12 FIGUERES ST.	300	306	14.234415	121.136502	2	1700	1711
614	Chc Equities, Inc.	#78	1800	1822	14.238774	121.135792	2	200	219
410	Persol Global Workforce Philippines, Inc.	SANTOL ST. CORNER MARANG ST.	1600	1613	14.246740	121.130056	2	500	505
411	Laguna Lrci - Luzon Ram Cycles, Inc.	#9205 	500	506	14.285706	121.140402	1	1800	1803
412	Kisney Food Concession Services	ENERGY ST. (CON. CARRIER)	700	703	14.233691	121.102957	3	800	803
413	Jrs Business Corporation (Jrs Express)	#189 	200	212	14.249607	121.129083	2	1700	1702
414	Royale Cold Storage North Inc.		1200	1205	14.227542	121.085303	2	1700	1713
415	Marlobel Trading	BLK11 LOT69 PH2	300	315	14.237682	121.138442	1	1500	1515
416	Jn4D Interior Design Services	BLK44 LOT10 	200	209	14.250632	121.127232	2	1400	1407
417	Cabueños Transport Cooperative	BLK15 LOT2 	400	404	14.290109	121.130783	2	300	301
418	Migtok Litson Manok	#42 J.P. RIZAL ST.	1400	1404	14.276332	121.124087	1	1500	1504
419	Petro Venture Corporation (Olivan Petro Fuel Express)		200	212	14.252842	121.128712	3	100	104
420	Eastern Aisle Credit Solutions Inc.	LAMCRES BUILDING 	300	313	14.229848	121.138082	2	700	707
421	Ren-Mer Fitness Gym	B42 L9 	900	920	14.242206	121.152962	2	1300	1304
422	Laval Office Supplies Trading	RLI BLDG.	200	216	14.243077	121.113180	1	1500	1514
423	1Syndeo Solution, Inc.	BLK 11 LOT 32 PH2 HYDRANGEA ST.	300	315	14.236653	121.138319	2	200	221
424	Ajjag Industrial Trading	BLK 26 LOT 21 	1800	1803	14.240555	121.138508	1	1500	1509
425	Feliberta And Loida Shuttle Services Incorporated		400	403	14.279013	121.127032	2	1700	1709
426	Nlk Frozen Products Store	STALL NO. 14	1400	1402	14.277266	121.123724	1	1500	1504
427	Renliekysel Lomi House	BLK 1 LOT 28 	200	210	14.261261	121.133029	3	800	805
428	Kleng Meat Shop	605	1100	1112	14.257917	121.127884	1	1500	1504
429	Tfam Construction Services	BLK 21 LOT 18 P1 	1800	1816	14.235702	121.136451	2	200	221
430	Estero-Ladaga Logistics Services	BLK6 L2 PH1 	900	904	14.238338	121.155531	2	1700	221
431	Mimi And Bebe Clothing Shop	794	800	811	14.252472	121.167779	1	1500	1501
432	Tsrevolution Engineering Services	BLK 1 LOT 45 	200	210	14.255681	121.130431	1	1500	1509
433	Bubbles Clear Laundry Service	537	1100	1103	14.262754	121.127419	2	1200	1208
434	Pharshan Pharmacy Co.	BLK10 LOT1 	100	103	14.243164	121.168702	3	900	912
435	Jirrz Printing Shop	BLK 13 LOT 34 	200	210	14.255679	121.130425	2	400	404
436	Cyclewash Laundromat	5505 ME (01) J.P. RIZAL ST.	1700	1708	14.270197	121.126146	2	1200	1208
437	Jano`S Airconditioning Shop	BLK69 LOT2 	900	920	14.240151	121.149678	2	100	101
438	Isrl Logistics Services	CLUBHOUSE 	100	103	14.242802	121.165811	2	1700	1703
439	Ajkap Trading	BLK 22 LOT 59 	200	210	14.262058	121.132837	1	1500	1515
440	Camella Dos Rios Trails Homeowner`S Association Inc.		1200	1201	14.231028	121.089720	2	1400	1411
441	Tea Vera And Frappe Company	BLK 1 LOT 3 MAIN ROAD 	200	210	14.256173	121.129296	3	800	809
442	Remz Catering Food Concession Services		1700	1701	14.263591	121.120910	3	800	802
443	Marielle`S Catering Food Concession Services		1700	1701	14.263667	121.120822	3	800	802
444	Norfe Drugstore	BLK 20 LOT 19 PHASE 1 	1000	1012	14.267153	121.157562	3	900	912
445	Janny`S Auto Parts Shop	#199 J.P. RIZAL ST.	1300	1302	14.279717	121.122479	1	1500	1516
446	Jia-Lyn Truck Parts Center		1700	1713	14.271126	121.122978	1	1500	1516
447	Ekklesia School Supplies	BLK 6 LOT 2E 	1600	1604	14.252580	121.138745	1	1500	1514
448	M.T. Maliuanag Construction Services	457	400	411	14.292958	121.130382	2	200	202
449	Jerald And Emil Scrap Trading		1600	1615	14.250609	121.139282	1	1500	1515
450	Matt D Enterprises	BLK16 LOT105 	900	915	14.243864	121.153307	1	1500	1515
451	Zoleta Meat Shop	#46	1800	1822	14.241947	121.142314	1	1500	1504
452	Jqa Vehicle Parts And Accessories Trading		1100	1109	14.262024	121.134095	1	1500	1516
453	Sbh Motors Corporation	112	1100	1103	14.262763	121.127503	1	1500	1516
454	Fratelli United Holdings, Inc.		1600	1617	14.242234	121.116427	2	200	211
455	Zoefie`S Food Hub	BLK 20 LOT 24 PHASE 1 	1000	1012	14.269180	121.159557	1	1500	1504
456	Akav Engineering Services	B22 L9 	200	204	14.251580	121.132374	2	200	209
457	Megga Steel Manufacturing Corporation	LOT 5	300	301	14.234066	121.134594	2	1700	1713
458	James Liza Rice Store		900	923	14.235245	121.157698	1	1500	1507
459	Rmj Chicken By Product	BLK 2 LOT 6 	200	204	14.253124	121.131770	1	1800	1807
460	St. Ly`S Enterprises	BLK 3 LOT 16 	200	204	14.253137	121.131835	2	1700	1711
461	Samgyup Saeyo Kitchenette	BLK 180 LOT 9-C 	900	913	14.237802	121.157716	3	800	812
462	Jerry Velasquez Rice Store	257	1600	1622	14.240041	121.132598	1	1500	1504
463	Rapthor Transport Services	BLK 3 LOT 4 	1100	1106	14.259954	121.128841	2	1700	1710
464	Technoprobe Asia Pte Ltd. (``Philippine Branch``)	FASTECH MFG. COMPLEX BLDG. 3 	700	703	14.234545	121.092958	1	1100	1114
465	Pinnacle Prime Holding Corporation	2ND FLR. CENTROMALL	1600	1614	14.242422	121.131146	2	700	705
466	Delpas Refrigeration And Airconditioning Services		800	806	14.260120	121.153651	2	1200	1211
467	Gridlock Safety Gears Retailing	BLK 7 LOT 12 	300	306	14.234699	121.136684	1	1500	1512
468	Rjsd Transport Services	BLK 3 LOT 1 	1600	1602	14.245092	121.137599	2	1700	1710
469	Cysril & Jihred Transport Services	BLK 6 LOT 25 PH 4 	500	508	14.281443	121.135622	2	1700	1710
470	Odnid Industrial Supply	B15 LOT 17 	1800	1803	14.240340	121.136760	1	1500	1509
471	One Resonance Electrical And Industrial Supplies Trading	BLK 4 LOT 11 	1000	1003	14.270305	121.154378	3	1200	1211
472	Motobuds Motorcycle Parts And Accessories		1000	1010	14.267981	121.158076	1	1500	1516
473	A2G Profec Engineering Services	BLK 5 LOT 7 	300	310	14.231688	121.140109	2	200	205
474	Eligabben Delivery Services	BLK7 LOT72 	900	916	14.243221	121.155057	2	1700	1703
475	Katapatan Pharmacy	BLK 44 LOT 104	1100	1110	14.271713	121.143511	3	900	912
476	Tamalariaca Fruits And Vegetables Trading	BLK43 LOT99	1100	1110	14.271683	121.143502	1	1500	1513
477	Eternal Chapel And Mortuary Corporation		900	922	14.234410	121.149884	2	1200	1203
478	Tiny Toe Lying-In Clinic	BLK 6 LOT 1 	1600	1611	14.240833	121.131994	2	900	908
479	Dim`S Rock Construction Services	BLK 6 LOT 2L 	1600	1604	14.252618	121.138887	2	200	221
480	Bobby And Laarni`S Salon	J.P. RIZAL ST.	1300	1302	14.276741	121.123744	2	1300	1303
481	Mailtag Ortigas Corporation	STALL #22 CENTRO MALL	1600	1614	14.242350	121.131164	2	1700	1702
482	Modhouse Construction Services	BLK 130 LOT 15 	900	913	14.238907	121.158042	2	200	203
483	Jare Enterprises, Inc.	#73	1800	1822	14.238372	121.133939	1	1500	1516
484	Goldlane Transport Services	BLK 18 LOT 21 	1600	1601	14.241420	121.127968	2	1700	1710
485	Ralph Lpg Trading	#312 	1100	1112	14.263306	121.127479	1	1500	1505
486	Industrial-Commercial Holdings, Inc.	LOT C & E-1 PARK DRIVE	700	703	14.237182	121.102000	2	200	211
487	Hvy Prime Machines Inc.	UNIT 117 COMMERCIAL CENTER	1700	1723	14.266606	121.117967	1	1500	1509
488	Ph Global Jet Express Inc.		200	205	14.253778	121.128716	2	1700	1713
489	Ph Global Jet Express Inc.	SERAFIN BUSINESS CENTER	300	308	14.228394	121.138780	2	1700	1702
490	Southcall Business Outsourcing Inc.	BLK 13 LOT 13 MATATAG ST.	200	210	14.254902	121.133349	2	1000	1005
491	Johannes Forwarding Services	BLK 8 LOT 4 PH 2A 	300	303	14.226525	121.136786	2	1700	1711
492	Klyedie`S Kitchen Catering Food Services	BLK 25 LOT 6 	200	201	14.253717	121.137605	3	800	803
493	Synagie Inc.	DOCK 2 PH 1 LAZADA E-LOGISTICS WAREHOUSE	1600	1617	14.242172	121.116299	2	1700	1713
494	Edwin And Mean Office And School Supplies	BLK 1 LOT 12 	900	930	14.241495	121.151694	1	1500	1512
495	Dubai Land Consumer Goods Trading	BLK 17D LOT 17 COMMERCIAL BLDG.	300	306	14.234446	121.136452	1	1500	1502
496	Clicktrade Est 2020 Industrial Trading	BLK 1 LOT 79 	1800	1811	14.236635	121.123207	1	1800	1809
497	Artemisplus Express Inc.	C/O FIRST SUMIDEN CIRCUITS INC. AMPERE ST.	700	703	14.233228	121.094077	3	800	802
498	The Meat Place (Hidden Jade Express)		1400	1407	14.278791	121.124858	3	800	808
499	Myy Property Leasing		400	405	14.277064	121.134065	2	200	211
500	Lucky Moves Bro Construction Supply	BLK 10 LOT 14 PH3	400	928	14.240805	121.156837	1	1500	1509
501	Jp Villarosa Engineering Consultancy	BLK 6 LOT 22	200	214	14.247625	121.121244	2	1400	1406
502	Principale Carwash And Auto Detailing Services	NATIONAL HIGHWAY	300	311	14.232257	121.135771	2	100	103
503	Helmet House Motorcycle Gears Trading		1100	1112	14.264830	121.127007	1	1500	1507
504	F And W Stewards Property Rental	#280 	400	409	14.288455	121.129145	2	200	211
505	Mad Printing Services	BLK 2 LOT 1 	400	404	14.290057	121.130916	1	1500	1512
506	Cli Holdings Inc.		1600	1617	14.242234	121.116610	2	200	211
507	Los Añes Logistics Services	BLK 2 LOT 29 	1800	1803	14.240328	121.136721	2	1700	1710
508	Annijo Land Development & Leasing Corporation		1700	1713	14.270883	121.123254	2	200	211
509	Robinson`S Supermarket Corporation (Uncle John`S)	#216 	300	307	14.228757	121.140055	3	1500	1507
510	Foodlink Advocacy Cooperative		1800	1822	14.244308	121.139495	2	300	301
511	Wall Street Courier Services Inc. (Ninja Van)	BLK 1 LOT 8 	200	204	14.253168	121.131955	2	1700	1713
512	Dengemsan Incorporated	BLK 180 LOT 6F 	900	913	14.236635	121.157817	3	900	912
513	Perez-Aplicador Car Rentals And Transport Corp.	BLK 3 LOT 1 	1100	1106	14.259967	121.128876	2	1700	1710
514	Jrc Cleaning Services	BLK 69 LOT 7 	800	817	14.261786	121.151854	2	1200	221
515	Leovigildo`S Lot Leasing	#400A	800	808	14.259361	121.165464	2	200	211
516	Kent Ruel Pharmacy	#734	1100	1112	14.259431	121.127705	3	900	912
517	Bds Shuttle Services	#272 ONYX ST. 	1700	1722	14.271971	121.125641	2	1700	1709
518	Budzfaye`S Hunger Food And Beverage Station	#44 J.P. RIZAL ST.	1400	1404	14.276173	121.123881	1	1500	1504
519	Mark Jas Logistics Services	BLK 3 LOT 11 	1800	1816	14.235717	121.136467	2	1700	1706
520	Icrescini Ventures Opc (Doing Business Under The Name And Style Of Optimum Life Merchandising)	#178 	1000	1006	14.275330	121.139639	1	1500	1507
521	Glen And Noeme Aircon & Refrigeration Services	BLK 21 LOT 5	1800	1811	14.236680	121.123297	2	1200	1211
522	Mkud Bacsilog Food Stall	CENTROMALL	1600	1614	14.242307	121.131225	3	800	808
523	Learn And Play Intervention Specialists (Lapis) Corp.	GSVCOM BLK 2D LOT 12 	300	306	14.234487	121.136650	2	500	502
524	Gasvill Lpg Trading	#0019 	100	106	14.242026	121.162718	1	1500	1505
525	Dengemsan Incorporated		200	212	14.252790	121.128628	3	900	912
526	Kusina Rojuana Restaurant	#606 	1100	1112	14.258036	121.127813	3	800	812
527	Feldal House Rental	BLK 4 LOT 6 PH 1 	300	302	14.227795	121.137643	2	200	201
528	Calamba-San Pedro Jeepney Operators And Drivers Corp.	BLK 02 LOT 29 	1100	1101	14.261920	121.128285	2	1700	1707
529	Digitally Intelligent Facility Systems Inc.	B4 L11 	1000	1003	14.278115	121.141138	1	1500	1509
530	Atlas Property Leasing		400	405	14.277669	121.135951	2	200	211
531	Ysas Homemade Pizza	BLK 1 LOT 68 	1600	1601	14.241941	121.128997	1	1500	1507
532	Zero To One Construction Corporation	UNIT F	1800	1804	14.239397	121.133832	2	200	208
533	Almighty Integrated Movers Services Corp.	9215	1600	1617	14.242234	121.116662	2	1700	1711
534	Silong Motorcycle Parts And Accessories Shop	#605	1100	1112	14.262751	121.126583	1	1500	1516
535	Joule Refrigeration And Airconditioning Services	BLK 7C LOT 4 SORIA ST. 	300	306	14.234690	121.136700	2	1200	1211
536	Souwer Tailoring Services	BLK 4 LOT 2 & 4 	900	916	14.243202	121.155051	2	1200	1213
537	Kineo Freight Services Co.		1700	1713	14.270865	121.123272	2	1700	1704
538	Rjally Office And School Supplies Trading		300	314	14.231575	121.145367	1	1500	1514
539	Zakrah Industrial Specialized Goods Trading		300	314	14.230786	121.143138	1	1500	1516
540	Amoyon`S Icetube Machine Fabrication Machine Repair Services	BLK 7 LOT 10 	1800	1809	14.235301	121.122637	2	1100	1111
541	Tutay`S Food Hub	#330	1100	1112	14.263249	121.127476	3	800	812
542	Autolandia Auto Supplies And Car Care Services	CENTROMALL	1600	1614	14.242424	121.130289	2	100	103
543	Daminlyn Loading Station	BLK 16 LOT 24 	900	915	14.242959	121.151086	1	1500	1503
544	Bank Of The Philippine Islands( Atm Offsite)	AMPERE ST. COR. MAIN AVE. 	700	703	14.233632	121.094027	2	700	701
615	Cgc Glass And Aluminum Works	BLK 1 A LOT 22 	800	813	14.259624	121.151160	2	1100	1108
545	Pinggol Motorcycle Parts And Accessories Shop	PH-3 BLK 1 LOT 7 	200	211	14.262483	121.144583	2	100	101
546	Bike Park Banlic Bike Parts & Accessories Store	DIVIMART BANLIC	300	314	14.230126	121.142342	1	1500	1516
547	Spherical Coordinate Security, Inc.		200	205	14.253786	121.128761	2	1400	1414
548	Loreto & Anna J Eatery	J.P. RIZAL ST. 	1500	1503	14.276685	121.123716	1	1500	1504
549	Agnp Corporation		1600	1614	14.246062	121.130041	1	1800	1803
550	4Jmotorshop Motorcycle Parts And Accessories Shop		1600	1617	14.242330	121.116240	1	1500	1516
551	Benjie Grace Bakery	#195	1600	1614	14.243579	121.130933	1	1500	1504
552	Dansol Bldg House Space Rental		300	313	14.229929	121.138007	2	200	211
553	Ndm Safety Gears And Devices Trading	#148 	1100	1103	14.264347	121.127318	1	1500	1515
554	Two Big Co Water Refilling Station	BEDEK RETAIL PLAZA	500	510	14.278264	121.138398	1	1500	1517
555	R.M. Dimayuga Glass And Aluminum Supply	#75	1800	1822	14.242008	121.142277	2	1100	1108
556	Jaffar Footwear Store		1400	1402	14.277374	121.123750	1	1500	1501
557	Chubibo Food Services	KG09 DIVIMART	300	314	14.230406	121.142826	3	800	808
558	Mexigo Food Express	C/OTANDUAY COMPOUND	1700	1723	14.270695	121.118833	3	800	802
559	Hikari Electronics Company Limited Inc.	BLK 153 LOT 43 	900	913	14.238656	121.162026	1	1100	1113
560	Janmay Mini Grocery	BLK 207 LOT 35 	900	913	14.238623	121.162047	1	1500	1507
561	Adobo And Sinigang Agnes Carinderia	BLK 151 LOT 29 	900	913	14.238614	121.162090	3	800	805
562	Cjjjmer Trading Corp.	BLK 16 LOT 16 	300	306	14.234563	121.136783	1	1800	1809
563	Igs Al Transport Services	#249 C	1800	1822	14.243862	121.144616	2	1700	1710
564	Hobby Workz Car Paint Services	BLK 12 LOT 2 	1600	1612	14.240348	121.132212	2	100	101
565	Laaraza Construction	BLK 11 LOT 40 PH 2 ACACIA ST. 	1000	1001	14.276519	121.150451	2	200	221
566	Kuya Jfm Meat Shop	BLK 207 LOT 5 	900	913	14.238631	121.162124	1	1500	1504
567	Ldm Vineyards Property Leasing	3479	200	212	14.252760	121.128646	2	200	211
568	Rtk2 Motor Shop	#274 	1600	1614	14.239091	121.132757	1	1500	1516
569	Joshua-Kyla Trucking Services		1600	1615	14.255948	121.137040	2	1700	1711
570	Rizmy Commercial Space Leasing		1600	1617	14.243033	121.117883	2	200	211
571	Beaconhouse Phils. Inc.	#5035 	1700	1713	14.265682	121.127877	2	500	505
572	Emj Glass And Aluminum Services	BLK 16 LOT 4 	900	920	14.243474	121.150790	2	1100	1108
573	Gl Milktea Corner	SUNDRELL BUS. CENTER #25 J.P. RIZAL	1700	1708	14.272683	121.125474	3	800	809
574	Mal Management Consultancy Services	#51 	1600	1614	14.248476	121.129535	2	1400	1406
575	Sg Edralin Transport Services	#216 	500	506	14.285629	121.140485	2	1700	1710
576	Lisha Hollowblocks Trading		300	311	14.232195	121.135830	1	1100	1109
577	Triple J 19 Consumer Goods Trading	BLK 55 LOT 4 PH3 	500	508	14.286220	121.133809	1	1500	1507
578	J L Food Cart	150 ELSOL FOODPARK	1500	1502	14.276260	121.122776	3	800	808
579	Matrixph Industrial Engineering Services	BLK 44 LOT 21 	1800	1816	14.235712	121.136403	2	1400	1410
580	Cjm Glass Aluminum And Iron Work Service		400	409	14.288500	121.129143	2	1100	1108
581	Chenka Realty And Development Corp.	#198B 	1700	1713	14.268334	121.126036	2	200	219
582	Bonafide Trainology Placement Services	BLK C3 LOT 2 	200	209	14.250595	121.127418	2	1400	1412
583	Brenton International Venture Manufacturing Corp.	PATIO HERMANO 	400	409	14.288877	121.129086	1	1500	1507
584	Bank Of The Philippine Islands (Atm Offsite)	KM. 46 	1100	1112	14.259789	121.127702	2	700	701
585	Relucio Used Goods Trading		1800	1810	14.245929	121.140442	1	1500	1515
586	Sun-Made Agri Plus Inc.	#69 	1100	1102	14.263496	121.126704	2	200	211
587	Melca Rice Trading	BLK 149 LOT 45 	900	913	14.238673	121.162150	1	1500	1504
588	Fnd Pharmacy	BLK 149 LOT 15 	900	913	14.235307	121.157704	3	900	912
589	Jastillana Food Supplement Retailing	BLK 18 LOT 10 PH 1 	1000	1012	14.269277	121.159519	1	1500	1510
590	Irgie Apartment Rental	BLK 8 LOT 12 	200	204	14.253243	121.131728	2	200	201
591	S&T Construction Supplies Trading	B17 L30 	1600	1601	14.240377	121.126063	1	1500	1509
592	Tru Way Truck And Bus Parts Inc.	53	1700	1713	14.269736	121.124794	1	1500	1507
593	Arks Bills Payment Center	BLK 14 LOT 61 PHASE 5 	800	816	14.261782	121.156237	2	700	708
594	Nosh Street Food Property Rental	BLK 13 LOT 27 	200	216	14.242289	121.114299	2	200	211
595	Hard Discount Philippines, Inc. (Dali Store)	BLK 4 LOT 13 	200	210	14.256127	121.129663	1	1500	1507
596	Ace Toy Shop		300	313	14.230006	121.138008	1	1500	1515
597	Fraicy Rice Sari-Sari Store	#57 	1100	1103	14.262778	121.127419	1	1500	1513
598	Toyota Financial Services Philippines Corporation		1700	1721	14.267731	121.128334	2	1700	1712
599	Ajt Intl Concept Co. Ltd.	WALTERMART CABUYAO KM. 47	300	311	14.232400	121.134297	3	800	808
600	Cdj Salon	CORNER A. BONIFACIO ST.	1400	1401	14.277299	121.125190	2	1300	1303
601	Lleramon Driving School		300	313	14.229470	121.141257	2	500	501
602	15Min Auto Care Services	BLK 2 LOT 1 	1800	1820	14.241301	121.141480	2	100	103
603	Edgemasters Real Estate Brokerage	BLK 8 LOT 12 PH 2 	1600	1609	14.238850	121.123710	2	200	203
604	Felipe L. Balbieran Commercial Unit Rental	#198	1700	1723	14.266664	121.118009	2	200	211
605	Greentelcom Cellphone & Accessories Center	WALTERMART CABUYAO KM. 47	300	311	14.232374	121.134458	1	1500	1503
606	Rapha-El Generics Pharmacy Inc.	UNIT 1 CARPENA APARTMENTS	900	909	14.235316	121.158687	3	900	912
607	Stone Fire Corporation	BLK11 LOT13 	1700	1720	14.271651	121.123301	1	1500	1515
608	Vtracker It Solutions	BLK 13 LOT 3 	1600	1620	14.244838	121.119149	2	1000	1003
609	Katagumpay Motor Parts And Gears Trading	UNIT 114 ANNIJO LAND DEVELOPMENT AND LEASING CORP.	1700	1723	14.273785	121.119951	1	1500	1516
610	K-Mor Galsan Commercial Leasing		1600	1614	14.248438	121.129549	2	200	211
611	E.A. Ocampo Enterprises (Full Tank)		1600	1617	14.246185	121.129117	3	100	104
612	Arlon Transport Services	BLK 11 LOT 37 PH 1 	1600	1601	14.241552	121.127983	2	1700	1710
613	En-Son Grocery		100	104	14.243682	121.170167	1	1500	1508
616	Cez Agri-Poultry Supply	UNIT C BLK 14 LOT 77 PH 5 	800	816	14.263095	121.156073	1	1500	1515
617	Jd Georgie Food Opc	#22 J.P. RIZAL ST.	1500	1503	14.272360	121.125483	3	800	812
618	Om Crown Battery Marketing Corp.	#140	200	212	14.252838	121.128710	1	1500	1516
619	Gasso Fuel Trading Inc.		1700	1723	14.275418	121.127389	3	100	104
620	Majun`S Kitchen Express Food House	BLK 13 LOT 27 	200	216	14.242292	121.114300	1	1500	1504
621	Nana`S Food Stall	BLK 13 LOT 27 	200	216	14.242271	121.114301	1	1500	1504
622	Smoke Shack K-Bbq Grill Company	#28 J.P. RIZAL ST.	1700	1708	14.272613	121.125430	3	800	812
623	Laguna Lrci - Luzon Ram Cycles, Inc.		900	923	14.241721	121.164354	1	1500	1516
624	10X Enterprises Opc	#51-D 	400	402	14.282015	121.126531	2	1700	1706
625	B.S.U. Laguna Aluminum And Glass Supply		200	206	14.253599	121.129629	3	1800	1809
626	Overdrive Philippines Inc.		1600	1617	14.244189	121.121999	1	1500	1516
627	Studio Karou Digital Marketing Services	#430 	400	411	14.292936	121.130418	2	400	401
628	Bountiful Industrial Supply	BLK 26 LOT 11 	200	207	14.249205	121.125275	1	1500	1509
629	Bank Of The Philippine Islands (Atm Offsite)	NEXPERIA 	700	703	14.230394	121.096064	2	700	701
630	Bank Of The Philippine Islands (Atm Offsite)	P&G 	700	703	14.232635	121.098719	2	700	701
631	Djstealth Trucking Services	BLK 5 LOT 14 	1100	1111	14.263771	121.127426	2	1700	1711
632	Cabuyao Malasakit Producers Cooperative (Malasakit)	#724 	1700	1702	14.273388	121.129224	2	300	301
633	A. Andal Poultry Wholesaling	#206 EMERALD ST.	1600	1619	14.247901	121.129723	1	1800	1801
634	E.M.E Electrical Installation Services	BLK 13 LOT 1 	800	803	14.251357	121.156471	2	200	203
635	Dwight Aircon Maintenance Services	BLK 227 LOT 22 	900	913	14.238698	121.162126	2	1200	1201
636	Bank Of The Philippine Islands (Atm Offsite)	WYETH PHILS.	1200	1203	14.221734	121.069544	2	700	701
637	Marble Spring Construction Services	BLK 9 LOT 31 	1600	1601	14.241529	121.127967	2	200	203
638	Kabisig-Leta Bicycle Shop	#625 	1100	1103	14.258142	121.127801	1	1500	1516
639	Seafood Shack Restaurant		300	311	14.234355	121.134829	3	800	812
640	Scn Builders Corp.	BLK 1 LOT 15 	400	404	14.290005	121.130923	2	200	203
641	Ripjey Electric Bike Trading	KM. 30 	200	212	14.255694	121.128487	1	1500	1516
642	M.B.S Transport Services	BLK 22 LOT 26 PHASE 1 	1000	1012	14.269141	121.159538	2	1700	1703
643	Petrol35 Fuel Trading		1600	1617	14.242345	121.116363	1	1500	1515
644	Nareltrans Corp.	BLK 1 LOT 8 	200	216	14.243849	121.110550	2	1700	1704
645	E.A. Ocampo Enterprises (Full Tank)	LOT 8-C-3 & LOT 8-C-2 	1800	1803	14.239486	121.137223	3	100	104
646	K&J`S Kitchenette	#16 	700	703	14.236152	121.105708	3	800	802
647	Frances Dioso Medical And Diagnostic Clinic	#119 	1500	1504	14.276664	121.125444	2	900	903
648	Mab Trucking Services And Equipment Rental Company	BLK 19 LOT 2 G/F MAB BLDG. 	200	210	14.254631	121.129495	2	1700	1711
649	Vin Ofel Logistics Services	BLK 8 LOT 2 	1600	1602	14.244590	121.134941	2	1700	1706
650	Jna-Space Property Rental		400	405	14.277764	121.136232	2	200	211
651	Htmb Commercial Lot And Building Rental	#1 	300	311	14.232876	121.135380	2	200	211
652	Btk Corporation	LOT 3 ION STREET 	700	702	14.235247	121.110582	1	1800	1812
653	Carylmelvin Photography Studio	BLK 6 LOT 14 PH 2 	300	315	14.237880	121.138602	2	400	403
654	Safexpress Logistics Inc.	ION ST. 	700	703	14.234910	121.110415	2	1700	1706
655	Does Pharmacy		1800	1813	14.244272	121.139503	3	900	912
656	3R Electro Mechanical Services	BLK 1 LT 16  PH 5	800	816	14.260558	121.154871	2	200	205
657	Betcho`S Hauler And Movers Corporation		1600	1617	14.246174	121.125112	2	1700	1712
658	Mhanie Shuttle Service	BLK 27 LOT 7 PH 1 	1000	1001	14.274697	121.150655	2	1700	1709
659	Ca Meat Trading	#23 	200	212	14.256743	121.128254	1	1800	1807
660	Aishiteru Sari-Sari Store	#133	1000	1006	14.277876	121.147577	1	1500	1513
661	Tower 6789 Corporation (Pure Mart)	LOT 4969-PT	900	931	14.235386	121.158300	1	1500	1513
662	Sge Logistic Solutions Inc.	#216 	500	506	14.285468	121.140628	2	1700	1706
663	Fast Logistics Learning And Development Corporation	FAST LOGISTICS WAREHOUSE COMPLEX	1600	1622	14.238586	121.116464	2	500	505
664	Gv6 Corporation		200	206	14.254313	121.129901	2	200	211
665	Regie Lpg Store	#240 QUEZON ST.	1400	1406	14.276030	121.126088	1	1500	1505
666	Decaph Engineering Services	BLK 8 LOT 1 	1800	1816	14.235744	121.136409	2	1400	1410
667	Bluesteel Industries Inc.	4 DIODE ST. 	700	703	14.237135	121.100082	1	1100	1112
668	Glen Lpg Store	BLK 63 LOT 48 	200	215	14.258209	121.145115	1	1500	1505
669	Jaira Lpg Store	BLK 68 LOT 31 	800	817	14.261905	121.151793	1	1500	1505
670	Aicoldserve Airconditioning & Refrigeration Shop	BLK 45 LOT 23 	1100	1110	14.265214	121.143084	2	1200	1211
671	Aml Project Ventures Opc	#51 	1600	1614	14.248369	121.129565	2	1700	1706
672	Cebuana Lhuillier Pawnshop - Mamatid Mabuhay City Branch	BLK 2 LOT 2 	900	928	14.235045	121.158125	2	700	709
673	A.T Flash General Construction Services Corp.	BLK 4 LOT 51 	900	915	14.241611	121.153656	2	200	208
674	Kvtan Engineering Services	BLK 8 LOT 7 	800	817	14.261775	121.151832	2	200	221
675	Rdq Pharmacy	BLK 27 LOT 5 PH 2 	500	508	14.281370	121.135694	3	900	912
676	Infin8E Environmental Specialist Opc	BLK 20 LOT 7  PH 2	300	315	14.234059	121.135879	3	1200	1209
677	Ifl Christian Academy, Inc.		1800	1806	14.247479	121.147515	2	500	503
678	Pres Corporation	BLK 8 LOT 4 KAIMITO ST. 	1600	1613	14.247725	121.134881	2	1400	1402
679	R.A.M. Fuel Station		1800	1802	14.238025	121.132356	3	100	104
680	Fransha Tiles Trading		300	311	14.236427	121.133738	1	1500	1509
681	Hope0105 Lpg Store	BLK 17 LOT 15 PH 2 	1000	1012	14.269181	121.159511	1	1500	1505
682	Tripple A Lpg Trading	BLK 44 LOT 196 	1100	1110	14.271719	121.143494	1	1500	1505
683	Shengcai Builders And Construction Supply	BLK 149 LOT 33 	900	913	14.242178	121.164961	1	1500	1509
684	Big N4 Logistics And Transport Corp.	BLK 01 LOT 10 	200	216	14.242546	121.113039	2	1700	1706
1306	Sanctified Enterprises		1600	1617	14.242330	121.116838	3	1100	1116
685	Laguna Foods Enterprises Opc	BLK 3 LOT 9 	1600	1603	14.242774	121.129496	1	1100	1105
686	Franzuela Mateo And Ezekiel Scrap Trading	#094 	900	922	14.232001	121.147785	1	1500	1515
687	Biancakes Cakes And Pastries Shop	#274 	1600	1622	14.238999	121.132789	1	1100	1105
688	Romarkk Grocery Store	BLK 25 LOT 2 	900	919	14.240674	121.150354	1	1500	1508
689	Tazarte Transport Services	BLK 10 LOT 8 	1600	1601	14.241485	121.128074	2	1700	1710
690	Hard Discount Philippines, Inc. (Dali Store)	BLK 130 LOT 46-49 	900	913	14.235074	121.153037	1	1500	1508
691	Inkorporate Office Solutions Company	BLK 38 LOT 32 	1600	1602	14.241768	121.131409	1	1500	1512
692	Hard Discount Philippines, Inc. (Dali Store)		1000	1007	14.275002	121.139300	1	1500	1508
693	Hard Discount Philippines, Inc. (Dali Store)	#338	100	106	14.244163	121.170074	1	1500	1508
694	1C Trading Corporation	KM 44 	1700	1713	14.271157	121.122940	1	1800	1811
695	Rose Ann O. Calleja Lpg Outlet	BLK 3 LOT 18 PH 3 	200	211	14.263428	121.145169	1	1500	1505
696	Isabelita Lpg Trading	BLK 2 LOT 4 PH 3 	1600	1607	14.249858	121.139348	1	1500	1505
697	Hope0105 Lpg Store	#10 BURGOS ST.	1300	1308	14.280463	121.124373	1	1500	1505
698	Ryc Metal Fabrication Service	BLK 8A LOT 22 	1800	1817	14.242648	121.143388	2	1100	1104
699	Masterking Services Incorporated	LOT 11 	1100	1112	14.262730	121.126589	2	1700	1706
700	Hard Discount Philippines, Inc. (Dali Store)	#162	800	818	14.257908	121.166027	1	1500	1508
701	Hard Discount Philippines, Inc. (Dali Store)	BLK 19 LOT 23 	200	211	14.262659	121.144583	1	1500	1508
702	Hard Discount Philippines, Inc. (Dali Store)		1600	1614	14.243823	121.131049	1	1500	1508
703	Codespeak Software Development Services	LOT 50-G-2A 	300	304	14.237411	121.134736	2	1000	1003
704	Elm Welding Shop	BLK 8 LOT 7 	100	105	14.246835	121.165015	2	100	102
705	R23L Enterprises Corp.		1600	1617	14.242411	121.116558	2	1700	1711
706	Campus Choice Food Haus	C/O PORTION FILLERS INC. #7 FUSION ST.	700	703	14.235964	121.103752	3	800	803
707	Medco Drugstore	#98 	1600	1614	14.243198	121.131090	3	900	912
708	D Sisters Pancitan Food Store	CENTRO MALL - CABUYAO	1600	1614	14.242569	121.130792	3	800	808
709	Juris Lpg Store	CAVITEHAN ROAD	800	806	14.259981	121.153639	1	1500	1505
710	Telecall Institute Of Technology Inc.	BLK 1 UNIT 202 	1400	1403	14.277087	121.123424	2	500	505
711	Villa Nida Resort	#899 	400	411	14.293259	121.131217	2	1600	1602
712	Jeline`S Lpg Outlet	#278 	1000	1007	14.274948	121.139661	1	1500	1505
713	Green Allied Ventures Corporation		800	805	14.260119	121.153856	1	1500	1515
714	Synod Auto Supply	#123 	1100	1112	14.263387	121.127238	1	1500	1516
715	Emil Lpg Store	#19 J.P. RIZAL ST.	1700	1708	14.270612	121.125991	1	1500	1505
716	Dn Angeles Construction Corporation	BLK 13 LOT 43 	1600	1620	14.244810	121.119092	2	200	208
717	Qoq Job Contracting Services Corp.	#522	1100	1112	14.262722	121.126646	2	1400	1407
718	Gst Construction Services	BLK 2 LOT 11 	1600	1613	14.246841	121.130121	2	200	203
719	Prince Jem Foods Bay Inc.	GLOBAL MEDICAL CENTER	300	308	14.233350	121.134794	3	800	802
720	Sativa Grains Trading Corp.		1600	1619	14.246092	121.128949	1	1800	1807
721	Byahero Transport	#289 	400	409	14.285117	121.128376	2	1700	1710
722	Eyo Galang Lpg Outlet	#339 	1000	1009	14.278951	121.146487	1	1500	1505
723	Vgmbros Space Rental	BLK 11 LOT 3 	200	210	14.257243	121.133412	2	200	211
724	Arq Lpg Shop	#626 	1100	1112	14.262807	121.126571	1	1500	1505
725	Acculab Calibration Laboratory Inc.	 BLK 4 LOT 2 RLI BLDG. 2	200	216	14.242452	121.113784	2	1400	1405
726	Jacob Gil Computer Parts And Accessories Shop	MALVAR ST.	1300	1306	14.278207	121.125222	1	1500	1503
727	Alyaahna Transportation Incorporated		1600	1617	14.242148	121.116255	2	1700	1709
728	Kabayanihan Employment Services Opc	#0117 	900	922	14.235716	121.151337	2	1400	1407
729	Mr. Veggies Savings And Credit Cooperative (Mrvsacc)	#181 	200	212	14.252817	121.128758	2	300	301
730	Jsas Bills Payment And Remittance Services	BLK 12 LOT 48 MATATAG ST.	200	210	14.257561	121.133740	1	1500	1503
731	F8 Movers Logistic Inc.	BLK 15 LOT 7 	1800	1809	14.235586	121.122275	2	1700	1706
732	Tamang Landasin Microlending Inc.	UNIT 3 BLDG 2 ROJJULA BLDG.	1700	1723	14.272239	121.124738	2	700	707
733	Celo Wearing Apparel Manufacturing	#256 	400	409	14.288635	121.129133	3	1500	1501
734	Bits-Biomedical Instrumentation & Technology Solutions Co. Ltd.	UN IT G-H RLI BUILDING 3 	200	216	14.242467	121.113455	1	1500	1515
735	Hercules-Offshore Engineering Services	#363 	100	104	14.244053	121.170184	2	1400	1410
736	Agape Commercial Leasing	CENTRALE BLDG.	200	216	14.242126	121.112523	2	200	211
737	R&E Wheels Auto Supply	B-LOT 1-A 	1600	1619	14.245954	121.128412	1	1500	1516
738	Poinciana Ventures Opc (Julie`S Bakeshop)	PASADA @ 	1200	1201	14.229849	121.092143	1	1500	1504
739	Agape Refrigeration And Airconditioning Services	BLK 64 LOT 5 PH 3 	500	508	14.281260	121.134942	2	1200	1201
740	Nono Commercial Building	BLK 26 LOT 14 	900	919	14.242989	121.151137	2	200	211
741	Future Lighting And Trading Corp.	BLK 38 LOT 16 	200	209	14.250668	121.127746	1	1800	1809
742	Jay Mobile Phones And Accessories Shop	CENTROMALL PULO	1600	1614	14.242343	121.131089	1	1500	1503
743	Edb Dental Clinic	UNIT 103-B BLK 1D LOT 10 DCK BLDG.	300	306	14.234011	121.135849	3	1500	1507
744	Caltekgroup Philippines Inc.	RLI BLDG. 2	200	216	14.243062	121.113801	2	1400	1405
745	Dorflex Aus Products Corporation		1600	1617	14.242736	121.116587	2	1700	1713
746	Philippine Seven Corporation (Commissary)		1700	1713	14.271184	121.123298	3	1500	1502
747	Ocean Waves Delivery Services	BLK 35 LOT 34 DAISY ST.	400	413	14.280999	121.132067	2	1700	1703
748	Starace Commercial Leasing		1700	1713	14.271135	121.123178	2	200	211
749	Epinomovers Trucking Services	BLK 14 LOT 16 ALMASIGA ST. 	1600	1603	14.242865	121.129432	2	1700	1711
750	Jasmine Lpg Outlet	B29 L2 	1600	1602	14.245109	121.137388	1	1500	1505
751	Rajs Lpg Store	#0841 	900	924	14.240188	121.171299	1	1500	1505
752	J And J Steel Trading	3884 A-2  	200	212	14.252740	121.128709	1	1500	1509
1444	Rasmia A. Gami Store		1400	1402	14.277412	121.123870	1	1500	1507
753	Batapa`S Airconditioning Services	BLK 36 LOT 15	1100	1110	14.271741	121.143579	2	1200	1201
754	Cabuyao Solo Parent Producers Cooperative (Csppc)	2/F 	100	106	14.246267	121.169520	2	300	301
755	Jainarose Food House	RCS NORTH INC.	1200	1205	14.227542	121.085305	3	800	802
756	Pru Life Insurance Corporation Of U.K.	UNIT 3-B MERCURY BLDG.	1700	1706	14.271195	121.123311	2	700	706
757	Cel And Seb Office And School Supplies Trading	#83	1700	1723	14.266534	121.118130	1	1800	1813
758	Lo And Behold Administrative Support Services	BLK 6 LOT 13 	1800	1809	14.235453	121.122552	2	1000	1001
759	Greencrest Development Corp.	AJ 208 COMMERCIAL BLDG.	300	317	14.229321	121.138084	2	200	219
760	Creative Production Technology Phils., Inc.		200	206	14.254335	121.129998	1	1500	1515
761	Gab`S Barber Shop	#226 	200	212	14.254308	121.128441	2	1300	1302
762	Conex Prime Inc.	#9243 	1600	1617	14.243548	121.120002	2	1400	1407
763	Megawide Commercial Corporation		400	405	14.277764	121.136793	3	100	104
764	Mark Andrew Lpg Trading	BLK 7 LOT 41 	1600	1602	14.245097	121.137384	1	1500	1505
765	Vp & C Food And Beverage Store	BLK 130 LOT 31 	900	913	14.238737	121.162105	3	800	811
766	Abe Bills Payment And Remittance Center	BLK 1 LOT 22 PH 5-A 	800	816	14.260388	121.154869	2	700	708
767	Lil` Fella`S Food Corner	#174 M.H. DEL PILAR ST.	1400	1405	14.276357	121.124823	3	800	808
768	Acj His N Her Fashion Boutique	DIVI-MALL - PULO	1600	1614	14.242899	121.131672	1	1500	1501
769	T.A.C. Delivery Services	#10 	1600	1622	14.249087	121.132287	2	1700	1703
770	Kwin C Food Services	C257 CENTRALE	1700	1713	14.270822	121.123725	3	800	812
771	Great Valley Trading Corporation	UNIT 1 LS SQUARE BLDG.	1700	1723	14.272287	121.121520	2	1700	1712
772	Meg@Vps Security Agency Inc.	UNIT 5 EASTLAND BLDG.	1600	1622	14.249159	121.132314	2	1400	1414
773	Dlaras Food Hub	DIVIMALL 	1600	1614	14.242898	121.131671	3	800	808
774	Gstech Network And Data Solution	BLK 58 LOT 32 	1100	1110	14.265243	121.139088	2	1000	1006
775	Vanguard Merchandising Corporation	BLK 60 LOT 14 	900	920	14.240178	121.149654	1	1800	1809
776	Kuya Tony Meatshop Opc	#84 NATIONAL HIGHWAY	1600	1614	14.247304	121.129589	1	1500	1504
777	Happyb Printing Services	#94	200	212	14.252963	121.128775	2	400	404
778	Kasile Hills Resort Inc.	CASILE-TAGAYTAY ROAD	600	603	14.187023	121.031007	2	1600	1602
779	Banlic Construction Supply		300	308	14.230149	121.137583	1	1500	1509
780	Efrace Automations Builders Corp.	BLK 5 LOT 22 	1800	1809	14.235284	121.122636	1	1500	1507
781	Cabuyao Ofw Consumers Cooperative (Caofwcoop)	B72 L28 	900	920	14.240253	121.149702	2	300	301
782	Myr And Ronvic Lpg Trading	CAVITEHAN ROAD	800	806	14.259752	121.152278	1	1500	1505
783	Ls3 Transport Services		300	316	14.234730	121.131711	2	1700	1710
784	Yumi Cosmetic Inc.	BLK 5 LOT 22 	1800	1805	14.238969	121.123639	1	1500	1512
785	Sodexo On-Site Services Philippines, Inc.	WYETH PHILIPPINES INC.	1200	1205	14.221736	121.069503	2	1400	1407
786	Jade Apartelle And Property Management Inc.	#5	1600	1614	14.248566	121.129520	2	200	211
787	Evangeline`S Dried Fish Stall		1400	1402	14.277454	121.123741	1	1500	1504
788	Overseas Filipino Worker Mabuhay Consumers Cooperative (Ofwmcc)	BLK 29 LOT 42 	900	920	14.240266	121.149721	2	300	301
789	Njlitrato-Photography And Printing Services	BLK 55 LOT 1 	100	103	14.242578	121.169471	2	400	404
790	Alfametro Marketing, Inc.	LOT 153	400	414	14.281925	121.126365	1	1500	1502
791	Wan Yuan Electric Bike Accessories Shop	9010 JP. RIZAL ST.	1700	1708	14.276720	121.123658	1	1500	1516
792	4-J`S Construction Services	BLK 9 LOT 11 	1800	1819	14.240818	121.140815	2	200	203
793	Christopher Lpg Store	BLK 1 LOT 112 	200	210	14.255900	121.128492	1	1500	1505
794	Harbel Civil Engineering Construction	BLK 1 LOT 6 	1000	1004	14.279284	121.143707	2	200	203
795	Mrm Meireiko Lpg Shop	BLK 207 LOT 25	900	913	14.238720	121.162031	1	1800	1808
796	Ara Lpg Shop	BLK 1 LOT 16 P3 	1000	1012	14.267942	121.159417	1	1500	1505
797	Febeliel Realty	RAFA BUSINESS CENTER 	1700	1710	14.276512	121.132772	2	200	211
798	Crisvogue Online Shop	BEDEK RETAIL PLAZA	500	510	14.277639	121.137483	1	1500	1501
799	Perm Scrap Trading	B21 L24 	200	210	14.261026	121.133114	1	1500	1515
800	Garagehero Fuel Station		400	410	14.291882	121.131289	3	100	104
801	Mommy Eve`S Food Stall	DIVI-MALL - PULO	1600	1614	14.242896	121.131652	3	800	808
802	Nito`S Auto Supply Inc.	SJB EMMANUEL 	1800	1808	14.239245	121.132988	1	1500	1516
803	A Premier Leasing Corp.		1700	1713	14.271044	121.123285	2	200	211
804	Lainified Commercial And Office Space	KM. 46 	1600	1614	14.248632	121.129501	2	200	211
805	Zion Saranghe Minimart	BLK 211 LOT 39 	900	913	14.241555	121.162206	1	1500	1502
806	Biddersinfinity Auction Product Trading	WAREHOUSE A&A 	200	205	14.253799	121.128836	3	1800	1802
807	Mainerhanz Trucking Services		1800	1822	14.244298	121.139613	2	1700	1711
808	Z Core Ventures Opc	#54 	900	931	14.233626	121.148551	1	1500	1515
809	Borton Sari-Sari Store	BLK 16 LOT 26 	800	813	14.259605	121.151126	1	1500	1513
810	Shekinah Coolcare Airconditioning And Refrigeration Services	BLK 43 LOT 20 	900	920	14.240194	121.149683	2	1200	1211
811	Jjd 1Top Auto Parts Supply	UNIT 4-B LS SQUARE	1700	1713	14.272302	121.121497	1	1500	1516
812	Jimsen & Karen Lpg Store	BLK 43 LOT 110 	1100	1110	14.271607	121.143529	1	1500	1505
813	Twintigers Ventures Inc. (Bathsheba Lifestyle And Wellness)		200	213	14.257133	121.135939	3	800	804
814	J.S. Vega Hardware & Construction Supply Corp.		300	311	14.231918	121.135730	1	1500	1509
815	Hemedez Lpg Center	BLK 3 LOT 44  PUROK 4 	800	802	14.254988	121.163647	1	1500	1505
816	Deloso Ramen Food House	2 FLR. UNIT 5 CEDRO BUILDING	300	317	14.229730	121.142085	3	800	812
817	Rebonding-101 Beauty Salon & Spa	#213	300	317	14.230067	121.137731	2	1300	1303
818	Mitana Construction Opc	BLK 15 LOT 2 	200	210	14.257654	121.134789	2	200	208
819	Worth Job Construction Corporation		600	603	14.187569	121.032169	2	200	203
820	Qamu Food Services	#378	1100	1112	14.262841	121.126622	2	1400	1404
821	Enertech Power Systems Opc	BLK 04 LOT 21 	1700	1712	14.272393	121.130728	1	1500	1509
822	Pf Velasco Pharmacy - Medical Clinic	BLK 7A LOT 6 	1600	1611	14.245237	121.130534	3	900	913
823	Medsave Rx Pharmacy	BLK 4 LOT 181 PH 1 	1000	1011	14.271752	121.143470	3	900	912
824	Mrosales Engineering Services	BLK 17 LOT 23 	1600	1601	14.241437	121.128037	2	1400	1410
825	Trans-World International Logistics Corporation		1600	1617	14.242456	121.116420	2	1700	1712
826	G Good Stewards Properties, Opc	FCGC BAYANIHAN BLDG.	1700	1702	14.268986	121.132976	2	200	211
827	Milestone Dental Clinic	C257 CENTRALE	1700	1713	14.270913	121.123761	2	900	902
828	Z & Z Dhags Enterprices Non-Specialized Wholesale Trading	BLK 19 LOT 2 PH 2 	300	315	14.237761	121.138637	1	1500	1507
829	Jason Christopher Paz Content Writing Services	#332 GOLD AVE.	1700	1722	14.271970	121.125647	2	1000	1001
830	Bank Of The Philippine Island(Atm Offsite)	PHOENIX ASIA SUNSTAR (ECO FORTUNE) NO.	1800	1822	14.236572	121.123255	2	700	701
831	Masaligan Logistics Inc.	#9243 	1600	1617	14.242295	121.116717	2	1700	1704
832	Negosyong Panalo Tayo Service Cooperative(Nepataco)	#71 	1800	1816	14.235392	121.135544	2	300	301
833	Bbt-Enterprises Airconditioning And Refrigeration Services	BLK. 1A LOT 3 	800	813	14.259564	121.151144	2	1200	1211
834	Baumann General Contractor And Construction Supplies Opc	BLK. 11 LOT 18 2ND FLOOR MASAGANA STREET 	200	210	14.258086	121.133284	2	200	208
835	Michel J. Lhuillier Financial Services (Pawnshops), Inc.	#199 J.P. RIZAL	1300	1302	14.279753	121.122457	2	700	709
836	Michel J. Lhuillier Financial Services (Pawnshops) Inc.	B1 L1 	1800	1820	14.241326	121.141358	1	1500	1507
837	Banua-Diaz Engineering Services	BLK. 18 LOT 13 YAKAL ST. 	1600	1603	14.242856	121.129340	2	1400	1410
838	Elite Medical And Diagnostic Center Inc.	JEC BLDG.	200	217	14.251612	121.128984	2	900	903
839	Jgtm Trading Corporation		400	411	14.292763	121.130576	1	1500	1509
840	Ezcamp Outdoor Gear Shop	UNIT 218 2ND FLR. ANNIJO BLDNG. 	1700	1723	14.273965	121.119790	1	1500	1507
841	Panaw Travel And Tours Corp.	BLK 34 LOT 2 	1600	1602	14.245130	121.137453	2	1600	1603
842	Fujitrans Logistics Philippines,Inc.		1100	1111	14.263837	121.127468	2	1700	1706
843	Vdc Gas Trading		600	603	14.181768	121.027905	1	1500	1505
844	Cafe 52	#114D RUBY ST.	1700	1722	14.272123	121.125855	3	800	804
845	Daizel`S Used Rtw Store	BLK 6 LOT 30 	1000	1011	14.271962	121.143705	1	1500	1501
846	24I.G Aircon & Refrigeration Services	BLK 7A LOT 8 	1100	1106	14.259864	121.129950	2	1200	1211
847	Swayne Construction Services	UNIT 201 TOTAL BLDG.	1700	1713	14.270619	121.123841	2	200	203
848	Rfm Corporation	(PPFC COMPOUND)	1600	1617	14.249875	121.133720	2	1700	1713
849	Dragonpower Consumer Goods Trading	DIVIMALL BRGY. PULO	1600	1614	14.242907	121.131622	1	1500	1511
850	Arcsc Trading Co.		900	922	14.233000	121.147661	3	100	104
851	Gap Complete Packaging Solutions Opc	#9027 	200	206	14.253947	121.130445	3	1800	1813
852	Jld Hardware Tools Store	MJSJ BUILDING	200	210	14.258257	121.132383	1	1500	1509
853	Jld School Supplies	MJSJ BUILDING	200	210	14.256416	121.130146	1	1500	1514
854	Pappi J Food House	BLK 12C LOT 7 BURGOS ST.	300	306	14.234775	121.136923	1	1500	1504
855	109 Aaa Corporation ( Cabuyao Mini Inn )		1700	1713	14.267042	121.126667	2	1600	1601
856	1D Builders Corp.	BLK 6 LOT 7 	200	206	14.254356	121.130107	2	1700	1713
857	3 Corner Square Opc	LOT 1-A 	200	213	14.257310	121.139766	1	1500	1509
858	3G Daily Foodmart Corp.	LOT 4-A 	900	911	14.236841	121.144225	1	1500	1508
859	703 Leasing And Property Management Incorporated	#1431 	1100	1112	14.262844	121.126653	2	200	211
860	8 Indie-Go Productions Inc.	#114-A RUBY ST. 	1700	1722	14.271966	121.125666	2	1000	1002
861	889 Packaging And Industrial Supplies Company (889 Enterprise)	BLK 21 LOT 11 	1700	1709	14.275219	121.132571	1	1500	1509
862	Magz-Well Sports Wear	#210 J.P. RIZAL	1300	1302	14.281810	121.114357	3	1500	1501
863	Luis & Joaquin Commercial Space Rental	COR. 	1100	1101	14.261908	121.128280	2	200	201
864	Alpina Realty, Inc.		700	703	14.236331	121.102231	2	200	212
865	Agustinian School Of Cabuyao Laguna, Inc.	#65 	200	212	14.254828	121.128331	2	500	503
866	Amed Enterprises	# 324	900	931	14.235561	121.161119	2	200	221
867	Edgardo M. Alcabasa Automation Services	# 111 OSMEÑA ST. 	1500	1505	14.278890	121.125674	2	100	106
868	Cabuyao Printing Press	#5 J.P. RIZAL ST. 	1500	1503	14.274029	121.124686	2	400	404
869	Sualco Woodworks	#68	200	212	14.254566	121.128613	1	1100	1117
870	Atl Realty Development Corporation		1500	1507	14.276061	121.123772	2	200	216
871	Mercy`S Chicken Store		1400	1402	14.277367	121.123873	1	1500	1504
872	C.R. Alcasabas Frozen Products Store		1400	1402	14.277472	121.123853	1	1500	1504
873	A.G. Alconaba Poultry Supply & General Merchandise	#44 	200	217	14.265300	121.144321	1	1500	1507
874	Ema - Iracss Industrial Services	B3 L1 	1600	1612	14.239899	121.131894	2	1200	1211
875	Advent Health Medical And Diagnostic Clinic	2ND FL. 	1700	1705	14.270981	121.123562	2	900	903
876	Khing Fhillip Enterprises		300	317	14.230084	121.137854	2	1700	1705
877	Tammmcor Engineering Services	BLK19 LOT3 	1600	1613	14.246820	121.130219	2	1100	1104
878	Ahon Sa Hirap, Inc. (A Microfinance Ngo)	BLK 6 LOT 5&6 	400	404	14.289596	121.130585	2	700	703
879	Adtek Enterprises Inc.		300	307	14.237561	121.143485	2	1400	1407
880	E.R.A Junkshop		1700	1713	14.271236	121.122852	3	1800	1810
881	Angelina`S Travel Inn Inc.		1700	1713	14.267695	121.126446	2	1600	1601
882	Ricky`S Trading		900	922	14.237695	121.156088	1	1500	1515
883	Honeywell School Supplies And General Merchandise	BLK43 LOT15 	900	920	14.239689	121.146964	1	1500	1507
884	Greg And Tina Sari-Sari Store	#141 	500	504	14.289406	121.137922	1	1500	1513
885	Asia Novo Boutique Hotel Inc.	310  J.P RIZAL ST.	1300	1302	14.278904	121.122977	2	200	201
886	Angels In Heaven School Inc.		1700	1723	14.265978	121.126857	2	500	503
887	Diamond Trading And Services	BLK-C4 LOT18 & 20 	200	209	14.250706	121.127438	2	400	404
888	A.L. Aquino Fireworks	#130	400	414	14.284383	121.127955	2	600	603
889	Jimler Store	BLK32 LOT5 PH1 	1000	1012	14.266674	121.158655	1	1500	1513
890	Sai-Vin Industrial Sales	BLK13 LOT2 	1600	1601	14.241451	121.128044	1	1500	1509
891	Angels Faith Christian School Inc.	BLK3 LOT2 	1800	1816	14.235760	121.136407	2	500	503
892	Ace + Fa Enterprises		1700	1710	14.275910	121.129341	1	1100	1113
893	Magic Oven Bakeshop	BLK1 LOT1 	800	802	14.254917	121.163554	1	1500	1504
894	Edmac`S Cycle Parts	BLK40 LOT4-A 	1000	1012	14.269333	121.159572	1	1500	1516
895	A.R.A Water Refilling Station	BLK 13 LOT 1 	800	816	14.263277	121.155933	1	1500	1517
896	J.A. Services Cooperative	F.B.BAILON ST.	1700	1720	14.271849	121.123611	2	300	301
897	Ako Ikaw May-Ari Ng Kooperatiba (Aimko)		1200	1205	14.221213	121.075048	2	300	301
898	Haydenharley School And Office Supplies Trading	#515 J. P. RIZAL ST.	1300	1302	14.276768	121.123624	1	1500	1514
899	Vgmg Property Rental	PHOENIX GASOLINE STATION	300	308	14.233446	121.134925	2	200	211
900	E.J.R. Hardware	BLK2 LOT10 	200	211	14.263811	121.143907	1	1500	1509
901	Probikes Motorcycle Center		300	308	14.230202	121.137541	1	1800	1803
902	Poy & Jessa Construction Supply	#73	200	217	14.254038	121.128669	1	1500	1509
903	Anitra Properties, Inc.	#236 BERMUDA COUNTRY	300	317	14.230107	121.137963	2	200	211
904	Acasio Shuttle Service	524	900	923	14.238104	121.170080	2	1700	1709
905	Black Nazarine Polyclinic		1500	1507	14.275326	121.126059	2	900	903
906	Vmae Beverages Trading	BLK5 LOT35 	500	507	14.288471	121.135318	1	1800	1807
907	Elektronicash Gadget`S Phoneshop Inc.	#103	200	212	14.252729	121.128752	1	1500	1503
908	Richelle Aguilar Foods		200	212	14.252627	121.128615	3	800	801
909	King Of Heaven Funeral Services And Chapel Co.		300	317	14.229930	121.137746	2	1200	1203
910	Yanni`S Meatshop	#17 	200	217	14.257140	121.128001	1	1500	1504
911	Angelic Learning School, Inc.	BLK20 LOT20 	200	209	14.251043	121.124196	2	500	503
912	Shekinah Movers	LOT 1C 	900	931	14.237393	121.150890	2	1700	1711
913	Iyo And Flor Fish Stall		1400	1402	14.277478	121.123763	1	1500	1504
914	Alma-Ronnie Store		1200	1205	14.221151	121.074844	1	1500	1513
915	Mega C Food Store	#11	200	217	14.255494	121.128355	1	1500	1507
916	Animal Loft Pet Grooming And Veterinary Clinic, Inc.	UNIT A RENTERO BLDG.	200	212	14.252603	121.128747	2	900	917
917	Microde Industrial Supply And Services	BLK37 LOT50 DOMINIC ST.	1000	1012	14.269385	121.159497	2	200	221
918	Sar-Ama`S Building	#27 J. P. RIZAL AVE.	1500	1503	14.274761	121.124481	2	200	211
919	Lorily`S Trading	#0586	200	217	14.249625	121.129271	1	1800	1807
920	Active Maintenance Ideal Services, Inc.	#80  AMIS BLDG.	300	308	14.230241	121.137499	2	1200	1201
921	A.M. Aggasid Realty & Development Inc.	#3 	300	308	14.230271	121.137476	2	200	219
922	Joseph Allen Lot Rentals	#5 J.P. RIZAL AVE.	1500	1503	14.275702	121.124109	2	200	211
923	Alfamart Trading Philippines, Inc.	BLK5 LOT23 	1700	1720	14.271966	121.123679	2	200	211
924	Alfamart Trading Philippines, Inc.		900	931	14.233023	121.147658	2	200	211
925	Alfamart Trading Philippines, Inc.		1800	1803	14.239053	121.136063	2	200	211
926	Lla Technocraft Enterprises Corp.	3 CANLUBANG ROAD	600	606	14.204963	121.039774	2	1200	1214
927	Amn Shield Inc.	SOUTHWALK 6 LOT2 BLK3 	200	216	14.242305	121.112957	3	1800	1812
928	Alfamart Trading Philippines, Inc.	L704 C 	400	409	14.291228	121.128886	2	200	211
929	Asian Institute Of Technology, Sciences And The Arts (Aitsa) Inc.	#35 P. BURGOS ST.	1300	1308	14.280713	121.124373	2	500	507
930	Dnamaxx Enzyme Enterprises	#66 FREE FARMERS ST.	900	931	14.231569	121.146225	1	1500	1515
931	Andok`S Litson Corporation	#20 J.P. RIZAL ST.	1500	1503	14.274630	121.124530	1	1500	1504
932	J A C Meat Shop	#15	200	217	14.251310	121.129072	1	1500	1504
933	Alonzo`S Sari-Sari Store	#280 	1000	1007	14.275031	121.139827	1	1500	1513
934	Avs Marketing Corporation ( Cabuyao Branch)	WAREHOUSE #4 	200	206	14.253687	121.128688	3	1800	1812
935	Advanced Micro Ions Solution Inc.	#80 	300	314	14.230871	121.143483	3	1800	1815
936	Mark Sari-Sari Store	BLK 80 LOT 17 	100	103	14.242737	121.169545	1	1500	1513
937	Physio Point Physical Theraphy And Rehab Medicine Inc.		1700	1713	14.273890	121.119921	2	900	914
938	Blue Shop General Merchandise	BLK 1 LOT 5 	900	920	14.240525	121.150246	1	1500	1507
939	Sonar Trucking	BLK 4 LOT 1B  CAGLIARI ST. 	1800	1805	14.238944	121.123617	2	1700	1711
940	Aldueza Events Production	F.B. BAILON ST.	1700	1720	14.271613	121.123475	2	600	607
941	Smac Emission Testing Center		300	314	14.230908	121.143665	2	1400	1409
942	Labadab Laundry Systems, Inc. (Labadab)	GROUND FLOOR UNIT B MBA BLDG. # 23 J.P. RIZAL ST.	1400	1404	14.276920	121.123716	2	1200	1208
943	Rafanel Pharmacy		1500	1504	14.276021	121.125798	3	900	912
944	Sholem Marketing	BLK 1 LOT 14-15 	200	210	14.256481	121.130616	1	1500	1507
945	Roque C. Amancio Jr. Commercial Space Rental	BLK 19 LOT 42 ,44,45	200	210	14.261138	121.132027	2	200	211
946	H. Amparo Construction And Maintenance Services	BLK 1 LOT 24 	1600	1601	14.241454	121.127996	2	200	221
947	Rsa Pasalubong	#118 A. BONIFACIO ST.	1400	1401	14.277460	121.125527	1	1500	1504
948	Ldm Rtw Outlet	BLK180 LOT6 	900	918	14.236853	121.157442	1	1500	1501
949	Aime Dental Corp	M.H DEL PILAR ST.	1400	1405	14.276385	121.124274	1	1500	1507
950	I.M.A. Packaging Supplies Retailing		200	212	14.252223	121.128882	1	1500	1515
951	Kusinazz Catering Services	#236 	100	106	14.245266	121.169787	3	800	803
952	Juan Alexis Adie Lpg Store		1600	1614	14.248713	121.129485	1	1500	1505
953	Vy On-Style Clothing Shop	BLK 18 LOT 16 	1600	1601	14.241470	121.127973	1	1500	1512
954	Unigem Ventures Incorporated (All-In Laundry Shop)	BLK 10 LOT 1 	200	210	14.257006	121.133200	2	1200	1208
955	Chyllzach Auto Care Services	#53 JP RIZAL ST	1700	1708	14.270935	121.125841	2	100	101
956	Mattheusse Perfume Trading	BLK 2 LOT 45 PH 1 	1800	1803	14.239604	121.136769	1	1800	1806
957	Agm 888 Agricultural Products Trading	#130 	300	317	14.229912	121.137785	1	1800	1801
958	Wash&Wear Laundry Shop	BLK 35 LOT 32 PH 1 	1000	1012	14.269385	121.159529	2	1200	1208
959	Joel Alo Transport Service	BLK 5 LOT 23 PH 2-B 	300	302	14.227393	121.135495	2	1700	1710
960	Aag Transport Corporation	BLK 21 LOT 50 	200	210	14.261978	121.132749	2	1700	1710
961	A&H Commercial Building		300	312	14.230961	121.136893	2	200	211
962	Cabuyao Hanoy Footwear Store	#71	1800	1822	14.241994	121.142288	1	1500	1501
963	Ashtrovia Medical Trading Corporation	BLK 35 LOT 8 KOWLOON PARK DRIVE	200	209	14.250650	121.127105	1	1500	1515
964	W.N. Amis Trucking Services	BLK 5 LOT 23 	1600	1610	14.251393	121.136729	2	1700	1711
965	Grace Gas Trading	BLK 42 LOT 19 	900	920	14.240205	121.149708	1	1500	1505
966	Dye-Namiks Sportswear Shop	#1170 P. BURGOS ST.	1300	1308	14.281127	121.125060	1	1500	1501
967	Laguna Jla Printing Station	UNIT 214 COMERCIO CENTRALE	1600	1614	14.241616	121.131513	2	400	404
968	Shaniah Homemade Native Delicacies Store	BLK 30 LOT 80 	900	921	14.242897	121.155736	1	1800	1807
969	Greg And Tina Lpg Outlet	#141 	500	504	14.289240	121.138026	1	1500	1505
970	Rhey Lpg Store	BLK 7 LOT 10 	200	207	14.249907	121.128950	1	1500	1505
971	Antipatia`S Lpg Trading	BLK 32 LOT 16 	900	919	14.243007	121.151101	1	1500	1505
972	Rea Lpg Store	BLK 69 LOT 7 	900	920	14.240174	121.149731	1	1500	1505
973	Roadspree Trucking Services	#35 	1700	1703	14.275221	121.132538	2	1700	1711
974	Farrah Lpg Store	BLK 46 LOT 7 PHASE 12 	1100	1110	14.271607	121.143564	1	1500	1505
975	Adfar Development Opc	RAY`S CORNER GULOD EXTENSION	900	931	14.235870	121.151653	2	200	207
976	Nerissa Lpg Trading	#143 A. BONIFACIO ST.	1400	1401	14.277258	121.125253	1	1500	1505
977	Abergas Lpg Trading	BLK 39 LOT 28 PH 8 	1100	1110	14.271644	121.143641	1	1500	1505
978	Rnd Safety Gears Trading	#5 	1100	1112	14.262842	121.126702	1	1500	1515
979	Jamz Pharmacy	BLK 16 LOT 11 	900	916	14.243243	121.155065	3	900	912
980	Alfametro Marketing, Inc.		800	808	14.258461	121.165708	1	1500	1502
981	Ggta Food Products (Ate Rica`S Bacsilog)	BLK 4 LOT 1 	200	216	14.242774	121.113882	1	1500	1504
982	Melo Mover Trucking Services	BLK 11 LOT 31 PH 5 	800	816	14.266622	121.158584	2	1700	1711
983	Alfamart Trading Philippines, Inc.		800	808	14.258808	121.165552	2	200	211
984	Marilyn Lpg Store	BLK 21 LOT 17 	800	804	14.235621	121.122392	1	1500	1505
985	Agc Powerbox  Electric Corporation	UNIT A	1800	1804	14.239376	121.133300	3	1100	1116
986	Dennis Lpg Trading	BLK 27 LOT 5 	1600	1602	14.245060	121.137396	1	1500	1505
987	Bitoy Wood Works	#194 	200	212	14.252653	121.128604	1	1500	1515
988	Jamila Shoe Store	#250 HERCE COMMERCIAL BLDG.	300	317	14.229869	121.137802	1	1500	1501
989	Mary Ann Antonio Gowns And Suits Shop	#2 	1800	1812	14.244300	121.139479	2	1200	1205
990	E Nails Salon & Spa	#2 JP RIZAL ST.	1700	1708	14.271700	121.125559	2	1300	1306
991	`Brent` Paresan	#31-B 	1800	1808	14.242064	121.131737	1	1500	1504
992	Janasss Bistro (Wingspot Unlimited)	UNIT 3 SOUTHWALK COMMERCIAL	200	216	14.242443	121.113792	3	800	812
993	Apo Huerto, Inc. (Angel`S Pizza)	UNIT 121 & 123 110 COMERCIO CENTRALE	1600	1614	14.241624	121.131533	3	800	812
994	Pamnatics Hair And Nail Salon	BLK 19 LOT 1 	1600	1601	14.241038	121.129393	2	1300	1303
995	Nameless Cafe	UNIT 105-106 SALA BUSINESS CENTER BLDG.	1700	1723	14.273817	121.119864	3	800	804
996	Miggy`S Diner	BLK 10 LOT 31 	1600	1620	14.243654	121.119246	3	800	802
997	Ec Laundry Shop	BLK 3 LOT 17 	1000	1011	14.271723	121.143366	2	1200	1208
998	Autocarpets Inc.	#3 DIODE ST.	700	703	14.237753	121.100303	1	1100	1113
999	A. Gatchalian-Agulto Corp.		200	205	14.253811	121.128920	2	200	213
1000	Ibyang`S Haus Of Pansit Malabon	#69	1100	1112	14.258598	121.128043	3	800	810
1001	Ebara Philippines Landholdings, Inc. ( Formerly Benguet Ebara Real Estate Corporation )	C/O EBI	1200	1205	14.223853	121.079607	2	200	219
1002	Bismark Credit And Loans Corporation	BLK4 LOT26 	200	207	14.249905	121.128950	2	700	707
1003	Doña Juana Garden Resort		200	204	14.252771	121.131930	2	1600	1602
1004	Chayni Rice Store	PILMART MARKET	300	313	14.228863	121.139162	1	1500	1513
1005	Bell-Lim Incorporated	#17 LIM-BELL BUSINESS CENTER J.P. RIZAL ST.	1500	1503	14.274995	121.124315	2	200	212
1006	Rmw Sari-Sari Store	#194	1800	1814	14.242615	121.142005	1	1500	1513
1007	Media Magic Graphics	2F KAMPANANG GINTO BUILDING	1700	1720	14.271782	121.123580	2	400	404
1008	Jo-Cell Stall Rental	#224 J.P RIZAL ST.	1300	1302	14.279181	121.122378	2	200	211
1009	Aubrey Mae Enterprises	BLK22 LOT16 	1800	1811	14.236571	121.123194	2	1400	1407
1010	Bestloan Finance And Leasing Philippines Inc.	DON ONOFRE BUILDING 2	1700	1713	14.270978	121.123555	2	700	703
1011	Allan And Elma`S Bread And Candies	Stall #1C-12 CABUYAO RETAIL PLAZA	1400	1402	14.277541	121.123980	1	1500	1507
1012	Trio Underchassis Repair Shop	#213	300	317	14.229811	121.137847	2	100	102
1013	Milagros A. Briones Lot Leasing	#393 	400	410	14.291836	121.131362	2	200	212
1014	Doban Minimart	8-A2 	1800	1803	14.238945	121.135638	1	1500	1507
1015	Bell Prints And Consumer Goods Trading	KAMPANANG GINTO BUILDING	1700	1723	14.271807	121.123604	2	400	403
1016	San Isidro Mini Palengke	#95	1800	1822	14.242098	121.142225	2	200	211
1017	Rj3A Trading	BLK-6 LOT-20 P1 	500	508	14.281391	121.135728	1	1500	1509
1018	Helen`S Vegetable Store	BLK 42 LOT 80 PH 8 	1100	1110	14.271585	121.143574	1	1500	1504
1019	Yakult Peddler	#1091 B3 L3 	1100	1101	14.261916	121.128360	1	1500	1507
1020	Bayan Mall Properties Inc.	#13 J.P. RIZAL ST.	1400	1404	14.276796	121.123383	2	200	211
1021	Manny-Bhel`S Bakery	 CORNER NATIONAL HIGHWAY	1100	1111	14.263818	121.127478	1	1100	1105
1022	Gb-Es Pharmacy And General Merchandise	95A	1800	1822	14.239178	121.136968	3	900	912
1023	Christian Jobex General Construction	#31 BURGOS ST.	1300	1308	14.280631	121.124219	2	200	203
1024	Jlmb Enterprises		1600	1615	14.250514	121.138597	3	1800	1810
1025	Ryan Keith Kent Groceries	PILMART MARKET	300	313	14.229036	121.139258	1	1500	1508
1026	Quali-Treat Laundry Hub	G/F MAB CONDO TEL 	1600	1619	14.246092	121.128971	2	1200	1208
1027	B-Mirk Multi-Purpose Cooperative	BLK15 LOT38 SAMPAGUITA ST. 	1600	1620	14.244846	121.119019	2	300	301
1028	Bernabest Food Products, Inc. (Siomai House)	WALTERMART CABUYAO KM. 47	300	311	14.232653	121.132780	3	800	808
1029	Ahren And Casey Lpg Store	BLK1 LOT14 	900	920	14.240209	121.149755	1	1500	1505
1030	Buenavista Financing Corporation	#25 J.P.RIZAL ST.	1700	1708	14.272243	121.125364	2	700	703
1031	Jhoross Water Refilling Station	BLK1 LOT20&21 	1600	1601	14.241456	121.128058	1	1500	1517
1032	Amore Infra Siglo De Oro Realty	BLK5 LOT4 &6& 8 	1600	1603	14.242795	121.129315	2	200	211
1033	Borjal Lpg Store	BLK 216 LOT 1 	900	913	14.238699	121.161992	1	1500	1505
1034	Birmingham Village-Pulo Pedicab Operators And Drivers Association (Bvpoda),Inc.		1600	1602	14.245078	121.137308	2	1700	1707
1035	Integrated Industrial Security Services, Inc.		200	205	14.254810	121.130882	2	1400	1414
1036	Asb Design Builders	BLK1 LOT11 PH-2A 	300	303	14.227369	121.136756	2	200	221
1037	Marc Hardware And Construction Supply	#254 	1600	1614	14.240347	121.132493	1	1500	1509
1038	Baliwag Lechon Manok, Inc.		1600	1622	14.245491	121.130224	1	1500	1504
1039	Ajr Paint Center		400	406	14.282753	121.126923	1	1500	1506
1040	Bradecina-Calleja Lpg Trading	BRADECINA-CALLEJA LPG TRADING	900	931	14.237338	121.150902	1	1500	1505
1041	Beautiful Islands Travel And Tours	BLK25 LOT15 	900	919	14.241040	121.151357	2	1600	1603
1042	Papa-Lito`s Resto Bar	75 N.H.	200	217	14.256523	121.128060	3	800	813
1043	Bigmind Engineering & Industrial Supply Company	#115	300	317	14.229944	121.137926	2	1100	1104
1044	L.V.B. Enterprises	130	400	414	14.285699	121.129784	2	1700	1711
1045	Tin Tin Gowns And Barong Rental	K1 BLDG.	300	317	14.228677	121.138579	1	1500	1501
1046	N. Barcelona Paint Center	#267 	1600	1614	14.247254	121.129728	1	1500	1506
1047	Baliwag Lechon Manok, Inc.	#58 	200	217	14.254905	121.128560	1	1500	1504
1048	Croms Catering Services	RFM ROAD	1600	1622	14.249172	121.132357	3	800	802
1049	Baliwag Lechon Manok		300	313	14.229100	121.138214	1	1500	1504
1050	Redeerei Engineering Services	#1 NATIONAL HIGHWAY 	300	311	14.232631	121.154626	2	200	209
1051	Anecitas Bonifacio Lot Leasing	#24	1800	1822	14.239383	121.143062	2	200	211
1052	Cmb Beverage Distribution Services	BLK3 LOT21 BRONZE ST. 	200	204	14.252777	121.131846	1	1800	1807
1053	Bukang Liwayway Connection Builders Inc.	#175 JP RIZAL ST.	1300	1302	14.269700	121.126508	2	200	208
1054	Jovito G. Borromeo Enterprise	BLK 44 LOT 19 PH1 	1800	1816	14.235767	121.136442	2	1400	1407
1055	Burleigh Avenue Inc.	#149	200	212	14.251893	121.128790	2	200	212
1056	Connie Hair Salon And Spa	CENTROMALL	1600	1614	14.242456	121.131125	2	1300	1303
1057	Ksk Enterprises	229	400	414	14.285750	121.129866	1	1500	1509
1058	Ksk Enterprises	229	400	414	14.293755	121.128563	1	1500	1509
1059	Brenton International Venture Manufacturing Corp.		1600	1617	14.242342	121.116845	1	1500	1507
1060	Jmak Enterprises	BLK20 LOT19 PH2 	300	315	14.237375	121.137348	1	1500	1507
1061	Carldel Computer System	BLK19 LOT8 MAGNOLIA PH2 	300	315	14.237608	121.138707	2	1000	1003
1062	Yesh And Yash Construction Services	BLK 67 LT 65 	1100	1110	14.271597	121.143622	2	200	221
1063	Rmmb`S Pharmacy And General Merchandise	BLK26 LOT7 	900	919	14.240428	121.149497	3	900	912
1064	Superpanda Enterprises	94	1700	1720	14.271632	121.123307	3	800	812
1065	Baldosano Eatery	BLK 180 LOT 7F 	900	907	14.236942	121.157814	3	800	805
1066	Asebd Engineering And Technical Services	BLK11 LOT25 PH2 	300	315	14.237376	121.137349	2	200	209
1067	Bca Logistics Corp.	LOT 8117 B	400	414	14.276044	121.128913	2	200	210
1068	Washimatic Laundromat	KM 98 	200	212	14.252856	121.128892	2	1200	1208
1069	Hl Faith Enterprises	#3 	300	311	14.237126	121.133508	1	1500	1505
1070	Baofeng Realty Corporation	#310 J.P. RIZAL ST.	1300	1302	14.276889	121.123582	2	200	211
1071	Bank Of The Philippine Islands (Atm)	NUTRI ASIA CMPD.	700	703	14.232769	121.101873	2	700	701
1072	7Dash21 Trading And Engineering Services	3	300	311	14.234005	121.134680	1	1500	1509
1073	Jays Consumer Goods Trading		200	213	14.255813	121.136340	1	1800	1804
1074	Dlb Construction Services	BLK 55 LOT 142 	1100	1110	14.271653	121.143506	2	200	203
1075	Enab Food And Beverage House	#10 J.P. RIZAL ST.	1400	1404	14.275276	121.124210	3	800	812
1076	Enab Fashion Shop	#10 J.P. RIZAL ST.	1400	1404	14.275248	121.124274	1	1500	1501
1077	R-Care Car Aircon Repair Services	BLK 17 LOT 42 	1600	1601	14.239800	121.126199	2	100	101
1078	Banaybanay Hardware	#592 	200	212	14.249432	121.129353	1	1500	1509
1079	`Cafe` Malvar Coffee Shop	97 MALVAR ST.	1300	1306	14.278518	121.125557	3	800	804
1080	Booze`Lia Motorcycle Parts And Accessories Shop		1700	1716	14.273455	121.125077	1	1500	1516
1081	Suedkabel International Electrical & Equipment Parts Trading	#349 	1000	1009	14.274927	121.139245	1	1500	1509
1082	Hl Matthew`S Trading	NO.1 MARINIG ROAD	1700	1702	14.275681	121.128324	1	1800	1808
1083	Ac Animal Bite Clinic	#17 J.P. RIZAL ST.	1500	1503	14.275021	121.124253	2	900	901
1084	Aj Loraine`S Meat And Vegetable Store	BLK 36 LOT 64 PH 1 	1000	1012	14.269232	121.159426	1	1500	1504
1085	Hl Matthew`S Trading	#574 	900	924	14.237298	121.150952	1	1800	1808
1086	Rsigci Multi-Line Auto Detailing Services (Rebirth Car Coating Center)	BLK 3 LOT 29 	200	210	14.255954	121.128521	2	100	101
1087	Zakkusurume Food Hub (Takoyaki Sensei Nambawan Sa Sarap)	#7	1700	1723	14.266601	121.118144	3	800	812
1088	Da`Boy Gas Retailing	BLK 6 LOT 57 PH 2-B	300	302	14.226260	121.135566	1	1500	1505
1089	Bigma Metal Company	FCGC-BAYANIHAN BUILDING	1700	1702	14.273387	121.129267	1	1100	1112
1090	D&A Commercial Lot Rental	#03 	200	212	14.252563	121.128779	2	200	215
1091	J4 Bernabe Construction Services	BLK 46 LOT 20 	1100	1110	14.271603	121.143526	2	200	203
1092	Brewsome Coffee Cafe Corporation	5365 UNIT 1 CEDRO COMMERCIAL BLDG.	300	317	14.229668	121.141966	3	800	804
1093	`R&R` Construction Services	#129 	1100	1103	14.262707	121.127429	2	200	203
1094	Acts Forwarding Services	BLK 6 LOT 3 PH 3 	1800	1809	14.235494	121.122468	2	1700	1704
1095	Mwfp Frozen Foods		300	311	14.232912	121.135382	1	1500	1504
1096	Jonalyn`S Mini Grocery	SITIO GUINTING	600	601	14.162771	121.019732	1	1500	1508
1097	Agk Lpg And Lpg Accessories Trading	PUROK 1	800	801	14.259716	121.151926	1	1500	1505
1098	1025 Bobier Lpg Shop	BLK 5 LOT 38 	900	915	14.242955	121.151087	1	1500	1505
1099	Aerocoole Airconditioning Services	BLK 6 LOT 6 	900	901	14.238278	121.164596	2	1200	1201
1100	H&S Food And Beverage House (Godo)	BLK 149 LOT 1 	900	913	14.241882	121.163922	3	800	811
1101	`Urban City` Vape Shop	#103	300	317	14.229760	121.137868	1	1500	1515
1102	Bluebird Land Company		1600	1614	14.248344	121.129571	2	200	211
1103	Pearljam Courier Services	BLK 14 LOT 77 PH 5 	1000	1012	14.269073	121.159542	2	1700	1702
1104	Mina`S Lugawan	#138	1100	1112	14.261971	121.127665	3	800	808
1105	Towa Pares Mami House	#7 	1800	1808	14.239386	121.143061	3	800	812
1106	Luckysun Household Goods Trading	GOLDEN HARVEST BLDG.	300	313	14.229773	121.138227	1	1500	1507
1107	Kuletz Sari-Sari Store	#199 	1000	1007	14.274948	121.139554	1	1500	1513
1108	John Karyl Sari-Sari Store	BLK 1 LOT 60 	1600	1601	14.241545	121.128028	1	1500	1513
1109	John Karyl Sari-Sari Store	BLK 1 LOT 60 	1600	1601	14.241533	121.127999	1	1500	1513
1110	Twins` Food And Beverage Stall (Mango Royal Milkshake)	BLK 30 LOT 3 	200	211	14.263857	121.144389	3	800	811
1111	Sabrina`S Laundry Shop	#43 	200	212	14.255733	121.128234	2	1200	1208
1112	Concepcion Industries, Inc. (Ref.)	CII BLDG. DIODE ST. COR. MAIN AVE. 	700	703	14.233753	121.094169	3	1100	1102
1113	C & S Development Corp.		1200	1205	14.221208	121.075268	2	700	705
1114	Cabuyao Packaging Corp.		1700	1723	14.266614	121.118116	2	1100	1102
1115	Cantavieja Medical Clinic And Pharmacy		1600	1614	14.248815	121.129342	3	900	913
1116	Mlac Space Rental	J.P. RIZAL ST. BRGY. 	1400	1404	14.276682	121.123679	2	200	211
1117	Clacio Electronics Shop	#243 	300	317	14.229731	121.137913	2	1000	1007
1118	Cbc Fine Food Services		300	313	14.229668	121.137832	1	1100	1105
1119	Crpn Property Leasing	MAMATID ROAD	300	313	14.229829	121.141569	2	200	201
1120	Pil Mart Stall Rental		300	317	14.229860	121.137904	2	200	217
1121	Gefrace Merchandise	PILMART MARKET	300	313	14.229019	121.139181	1	1500	1503
1122	H.A.Cartaño Sari-Sari Store		1400	1402	14.277444	121.123760	1	1500	1513
1123	Cabuyao Market Vendors Multi-Purpose Cooperative		1400	1402	14.277964	121.123525	2	300	301
1124	Colt Laguna Development Corp. (Realty)	RM. 22 3RD FL. SUNDREL BLDG.	1700	1723	14.272300	121.125326	2	200	219
1125	Cabuyao Nursery School & Child Center, Inc.		400	408	14.286231	121.128985	2	500	502
1126	Jonco Realty	BLK11 LOT1 PH1 	500	508	14.281414	121.135794	2	1400	1406
1127	Ndcaralipio Commercial Lot And Building Rental	195	1700	1713	14.271327	121.122752	2	200	201
1128	Baby Andrei Rice Store	#21 	1600	1622	14.246090	121.129089	1	1500	1504
1129	Cct Multipurpose Cooperative	#24  J.P. RIZAL ST.	1500	1503	14.278283	121.124756	2	300	301
1130	Cabuyao National High School Multi-Purpose Cooperative		1700	1723	14.275142	121.126723	2	300	301
1131	Skyneage Enterprises	B-31 L-20 	900	919	14.242993	121.151089	1	1500	1509
1132	Honey One Water Station	BLK1 LOT1 	900	904	14.238157	121.155917	1	1500	1517
1133	Cavite Apc Lending Company, Inc.	2ND FLR.  LIM-BELL BUSINESS CENTER J.P. RIZAL ST.	1500	1503	14.278286	121.124757	2	700	703
1134	Astrige Precision Trading	#210 	500	506	14.285692	121.139929	2	1100	1104
1135	Botica Del Cartaño	BLK44 LOT19 PH2 MAIN ROAD 	500	508	14.282344	121.137563	3	900	912
1136	3 Kids Enterprises	BLK1 LOT9 	400	404	14.289880	121.130792	2	1700	1711
1137	Sally Vulcanizing Shop	#129 	300	317	14.229950	121.138052	2	100	107
1138	Lester & Sj Store	BLK 7 LOT 39 	200	207	14.249905	121.128950	1	1500	1504
1139	Bar Code Rice Dealer	PILMART MARKET	300	313	14.229056	121.139237	1	1500	1504
1140	Divinity Infinity Learning Center, Inc.	BLK2 LOT1 	900	919	14.241708	121.150238	2	500	502
1141	Cecilia`S Petron Gas Station	#34 J.P RIZAL ST. AVE 	1700	1708	14.278272	121.124750	1	1500	1505
1142	Al Cabato Enterprises	BLK5 LOT21 PH3 	1800	1809	14.235596	121.122303	2	1700	1711
1143	Cabuyao Agriculture And Fishery Multi-Purpose Cooperative (Cafmpc)	AGRICULTURE BLDG.	1700	1723	14.278273	121.124760	2	300	301
1144	Cavite Apc Lending Company Inc.	ROOM #3 2ND FLOOR SIOLAND BUILDING	300	317	14.229719	121.137804	2	700	707
1145	Robinsons Supermarket Corporation (Uncle John`S)	#93 	1800	1818	14.242097	121.142229	1	1500	1502
1146	Casile-Guinting Upland Marketing Cooperative		600	602	14.166831	121.018984	2	300	301
1147	Julianne Jumelle Store	CENTENNIAL MARKET	1800	1822	14.238692	121.135420	1	1500	1513
1148	Migs & Cristy Meat & Chicken By Products	#012	200	217	14.255352	121.128376	1	1500	1504
1149	Card Sme Bank, Inc., A Thrift Bank	BLK 1 LOT 10 	300	305	14.232154	121.137598	2	700	702
1150	Card Sme Bank, Inc. A Thrift Bank	BLK12 LOT14 J.P. RIZAL ST.	1700	1708	14.269192	121.126351	2	700	702
1151	Rhey And Joshua Meat Store	MEAT STALL# 9 CABUYAO RETAIL PLAZA	1400	1402	14.277471	121.123797	1	1500	1504
1152	Satoragi`S Bakery	#206 QUEZON ST. 	1300	1307	14.277998	121.124151	1	1500	1504
1153	Aisonren Commercial Leasing	#229 J.P. RIZAL ST.	1300	1302	14.279691	121.122641	2	200	211
1154	Golden Stream Hardware	BLK26 LOT10 	900	919	14.240359	121.149333	1	1500	1509
1155	John And Jhed Enterprises	B206 L3 	900	913	14.241674	121.162529	1	1500	1509
1156	Bert Chicken By Products	BLK25 LOT29 	100	103	14.242683	121.169628	1	1500	1504
1157	Katapatan Pharmacy	#39	200	217	14.256068	121.128152	3	900	912
1158	Crispin C. Castillo Lot Leasing	#258	900	931	14.234950	121.154658	2	200	211
1159	Shirley Cartaño Fish Stall		1400	1402	14.277329	121.123822	1	1500	1504
1160	Cure-Corner Pharmacy	BLK 2 LOT 1 MAINROAD 	200	211	14.263108	121.144544	3	900	912
1161	Tike-Ee Heavy Equipment Rental		1600	1618	14.249192	121.132375	2	200	210
1162	Chingu Franchise Business Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232257	121.134150	3	800	811
1163	Dinsun Warehouse Sub Leasing	180	1700	1713	14.267301	121.126747	2	1700	1713
1164	Ravc Rice Dealer	PILMART MARKET	300	313	14.228793	121.139167	1	1500	1504
1165	Cabuyao Employees Multi-Purpose Cooperative (Cempco)		1700	1720	14.271656	121.123243	2	300	301
1166	Pyel Meat Stand	BLK 24 LOT 1 	100	103	14.242637	121.169692	1	1500	1504
1167	Centroplay Inc.	CENTRO MALL	1600	1614	14.242362	121.131131	2	600	606
1168	Jec Building	J.E.C. BUILDING 	200	212	14.252262	121.128662	2	200	211
1169	Bread Knights Bakery	BLK 206 LOT 41 	900	913	14.238665	121.161965	1	1500	1504
1170	A-Tech Plus Automotive Service	CENTROMALL CMPD.	1600	1614	14.242186	121.131253	2	100	101
1171	Centerline Hardware Supply And Services, Inc.	#120A CANTILLANO BLDG.	300	317	14.229791	121.137997	1	1500	1509
1172	Vetectors Animal Clinic	#28 J.P RIZAL ST. 	1700	1708	14.272601	121.125432	2	900	917
1173	Aida S. Cantalejo Consultancy Services	BLK21 LOT16 MAINGAT ST.	200	210	14.260845	121.133244	2	1400	1406
1174	Cayrosan Construction Inc.	187 MH DEL PILAR ST.	1400	1405	14.276484	121.125090	2	200	204
1175	Oasis Animal Clinic		1600	1614	14.248072	121.129424	1	1500	1507
1176	Illan`S Meat Stop	#11	200	217	14.255296	121.128403	1	1500	1504
1177	Tgc Tools And Fabrication Services Corporation	BLK 2 LOT 3 	1700	1703	14.270851	121.125562	2	1100	1104
1178	St Joseph 7 Hardware Trading	B13 L7 PH5	800	816	14.266609	121.158662	1	1500	1509
1179	Shp Industrial Supply And Services		300	311	14.233107	121.135291	1	1500	1509
1180	Card Sme Bank, Inc. A Thrift Bank	BLK 3 LOT 10 	900	930	14.240713	121.156793	2	700	702
1181	Cabuyao School Personnel Multi-Purpose Cooperative	CABUYAO CENTRAL SCHOOL OSMEÑA ST.	1400	1408	14.277028	121.126679	2	300	301
1182	Cabuyao Powermax Holding Incorporated	#113 	300	308	14.230306	121.137458	2	200	211
1183	Lcac Expresspay Remittance And Payment Center	BLK-3A LOT5 	900	916	14.243182	121.155081	2	700	708
1184	Wide Coverage System Enterprises		1700	1720	14.271708	121.123294	2	1000	1003
1185	King Melvin Rice Store	BLK222 LOT8 	900	913	14.238643	121.161998	1	1500	1504
1186	Bert Chicken By Products	BLK212 LOT51 	900	913	14.238632	121.161991	1	1500	1504
1187	Llanci Venn Enterprise	BLK13 LOT30 PH5 	800	816	14.263668	121.155146	1	1500	1504
1188	F.C. Carmelotes Scrap Trading		1600	1615	14.250908	121.140151	1	1500	1515
1189	Sparkling Cooldew Water Refilling Station	#16 	300	311	14.233118	121.135237	1	1500	1517
1190	Eka Rigid Construction And Consultancy Services	BLK2 LOT29 	1000	1004	14.279315	121.143685	2	200	203
1191	Crest Singapore, Inc. (Representative Office)	UNIT 2 G/F GPS BUILDING	200	216	14.243902	121.113807	2	1400	1402
1192	Lmc Wash Laundry Services	#3 ROJUANA BLDG.	200	217	14.255178	121.128414	2	1200	1208
1193	Akhc Wash Laundry Services	#3 J.P. RIZAL ST. 	1700	1708	14.273219	121.125041	2	1200	1208
1194	Corepoint Technologies Inc.	B47 L16 	200	209	14.250724	121.127149	2	1000	1003
1195	Card Sme Bank, Inc. A Thrift Bank	BLK 7 LOT 58 KAIMITO CORNER DURIAN ST.	1600	1613	14.246724	121.130077	2	700	702
1196	Cambalo Services Corp.	BLK 18 LOT 8 	1800	1809	14.235569	121.122341	2	1000	1009
1197	Cellty Mobile Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232594	121.132708	1	1500	1503
1198	Cabuyao Central Homeowners`S Association, Inc.	BLK 8 	1600	1603	14.242681	121.129418	2	1400	1411
1199	Jenna Sari-Sari Store	#229 J.P. RIZAL	1300	1302	14.279690	121.122642	1	1500	1513
1200	Ren-Son Sari-Sari Store	#106 	300	311	14.233331	121.135160	1	1500	1513
1201	Kcg Engineering Services	BLK 15 LOT 27 	1800	1811	14.236585	121.123253	2	1400	1410
1202	G-Kicks Footwear Shop	#240 DEL PILAR ST.	1400	1405	14.276772	121.125043	1	1500	1501
1203	Leziram Health And Beauty Products Trading	BLK 16 LOT 17 PH 5	800	816	14.266560	121.158773	1	1500	1510
1204	Colorlux Media, Inc.	BLDG. 5 PANORAMA COMPOUND HOLOGRAM ST.	700	703	14.233207	121.109327	2	400	401
1205	Mardy Hair And Beauty Salon	#13	1600	1622	14.248753	121.129519	2	1300	1303
1206	Amiel Water Refilling Station	BLK 2 LOT 62 	1800	1803	14.239825	121.136991	1	1500	1517
1207	Janoah Food Cart ( Shawarma Shack)	#182 	300	317	14.230111	121.137962	3	800	808
1208	Clinica Laguna Multi Specialty Center And Diagnostic Inc.		1600	1617	14.244487	121.123525	2	900	903
1209	Jaymer Laundry Shop	#213 COMMONS CENTENNIAL COMMERCIAL BLDG.	1600	1622	14.246235	121.129587	2	1200	1208
1210	Heights Animal Clinic		300	313	14.228898	121.138666	2	900	917
1211	Janet And Raymond Lpg Store	#121 	500	504	14.287999	121.138498	1	1500	1505
1212	Olive Tree Food House (Black Naicha Cafe)	UNIT 1 ROJJULA BLDG.	1700	1720	14.272451	121.124661	3	800	812
1213	Iv`S Rice Trading	#0085 	900	922	14.234982	121.157957	1	1500	1513
1214	Tutut`S Barbershop And Salon		1600	1606	14.242932	121.131564	2	1300	1303
1215	Theurbanboutique Clothing Retailing Stall	#210 J.P. RIZAL ST.	1300	1302	14.279810	121.122442	1	1500	1501
1216	Choggy Foods Corp. (Choggy Chicken)	BLK 3-D LOT 8 	300	306	14.234219	121.136401	1	1500	1504
1217	Uzziel Lpg Store	BLK 04 LOT 08  PH 1	200	211	14.264261	121.144883	1	1500	1505
1218	Amorganda`S Lying-In Clinic	BLK 180 LOT 71 	900	913	14.237050	121.157819	2	900	908
1219	Double P Hardware		800	806	14.260066	121.153781	1	1500	1509
1220	Jay&May Poultry Supplies	BLK 1 LOT 59 	200	210	14.256367	121.130685	1	1500	1515
1221	Jay&May Consumer Goods Trading	BLK 1 LOT 59 	200	210	14.256367	121.130685	1	1500	1507
1222	Mai Mai`S Canteen	#236 	300	313	14.229646	121.137804	3	800	802
1223	Marcsean Lpg Store	BLK 7 LOT 40 	200	207	14.249457	121.126386	1	1500	1505
1224	Jovit Sari-Sari Store	BLK 6 LOT 23	200	210	14.256785	121.131822	1	1500	1513
1225	Jovit Consumer Goods Trading	BLK 6 LOT 22 	200	210	14.256785	121.131822	1	1500	1507
1226	Jcwash Laundry Shop	BLK 69 LOT 18 	900	920	14.240259	121.149669	2	1200	1208
1227	D`Curve Cabuyao Party Needs Rental	BLK 2 LOT 20 	1100	1101	14.261922	121.128346	2	600	605
1228	Clanor Consumer Goods Trading	BLK 13 LOT 6 	1000	1011	14.271601	121.143564	1	1500	1507
1229	China Bank Savings, Inc.		1700	1713	14.271287	121.123012	2	700	702
1230	Justine`S Laundry Shop	BLK 80 LOT 53 	100	103	14.242486	121.169605	2	1200	1208
1231	Jns Sari-Sari Store	BLK 46 LOT 7 	900	920	14.240273	121.149699	1	1500	1513
1232	Leonard Sari-Sari Store	BLK 34 LOT 41 	1600	1602	14.245098	121.137485	1	1500	1513
1233	Aquaeagle Water Refilling Station	BLK 2 LOT 6 	1700	1709	14.275181	121.132585	1	1500	1517
1234	Lcortez Logistics Services	BLK 2 LOT 49 	1000	1001	14.274653	121.150473	2	1700	1706
1235	Evelyn Sari-Sari Store	BLK 18 LOT 109 	1000	1011	14.271651	121.143433	1	1500	1513
1236	Sheland Lpg Store	BLK 1 LOT 8 PH 1 	500	508	14.281438	121.135846	1	1500	1505
1237	City Service Corporation	BLK 4 LT A-2 	200	206	14.254618	121.129510	2	1400	1407
1238	Kcnd Ricemill	#263	1800	1822	14.241893	121.142262	1	1500	1504
1239	Printway Marketing & Services	BLK-17D LOT3 	300	306	14.234578	121.135716	2	1400	1407
1240	Diezmo Realty Corporation	C/O WEBFORGE BLDG. MAIN AVE. HOLOGRAM ST. 	700	703	14.235188	121.108347	2	200	212
1241	Jeffrey Candles Manufacturing	#962 	1100	1112	14.261710	121.129003	1	1100	1116
1242	Christ The King School Of Cabuyao, Inc.	BLK223 LOT38-44 	900	913	14.239187	121.160707	2	500	503
1243	Denz Sari-Sari Store	BLK 46 LOT 3 	900	920	14.240196	121.149677	1	1500	1513
1244	Angel Fame Trading	#17 	200	212	14.257127	121.127925	1	1500	1504
1245	Jeremiah Montessori School, Inc.	BLK27 LOT10 PH2 	500	508	14.283832	121.138417	2	500	503
1246	Liway Chicken Trading	BLK9 LOT12  	200	204	14.252688	121.131882	1	1500	1504
1247	Angel Lynne`S Bread Haus Atbpa.	#115 RUBY ST. 	1700	1722	14.271918	121.125764	1	1500	1504
1248	Well Of Wisdom Preparatory And Grade School, Inc.	BLK6 LOT40 	1000	1012	14.267620	121.159323	2	500	502
1249	E.T. De Vera Work Assistance & Management Services	#114E RUBY ST.	1700	1723	14.271915	121.125679	2	1400	1406
1250	Jmdg Enterprises	#347	1100	1112	14.262845	121.126677	1	1800	1812
1251	Redbird Enterprise	J.P. RIZAL ST. 	1400	1404	14.277313	121.123324	1	1500	1514
1252	Jmar Industrial Services	BLK3 LOT2-4 GUIJO ST.	1600	1603	14.243231	121.130107	2	200	221
1253	Marcelina C. De Vera Yakult Dealer	BLK25 LOT149 	1000	1011	14.271626	121.143625	1	1500	1507
1254	Living Myth Medical Clinic	2/F SERAFIN BUSINESS CENTER	300	308	14.228221	121.138824	2	900	903
1255	Delca 7 Mart	#43	1800	1822	14.246339	121.144403	2	200	211
1256	Mhel And Bhell Rice Store		1400	1403	14.277076	121.123437	1	1500	1504
1257	Rbce Enterprises	#7415 B.E	1800	1822	14.244306	121.139712	2	1200	1202
1258	Dmci Project Developers, Inc.		1600	1622	14.278287	121.124761	2	200	219
1259	Deckercargo Logistics Corporation	WAREHOUSE 14-15	200	204	14.252914	121.131695	2	1700	1713
1260	Citi Global College Inc.	#107 LIMCAOCO ST.	1300	1304	14.278716	121.123725	2	500	507
1261	Acd Convenience Store	#121 	200	217	14.255110	121.128422	1	1500	1502
1262	Ecd Commercial Building	314 BLDG.	300	317	14.230007	121.138065	2	200	211
1263	Bagsik Poultry Supply	BLK44 LOT123 	1100	1110	14.271654	121.143480	1	1500	1515
1264	Hilary Commercial Center	#73 	1800	1822	14.241999	121.142282	2	200	211
1265	Rian Store	BLK79 LOT5 	100	103	14.242356	121.168617	1	1500	1513
1266	Dengemsan Incorporated	256 J.P. RIZAL ST.	1300	1302	14.277805	121.123157	3	900	912
1267	Deus Providet Corporation	WALTERMART CABUYAO KM. 47	300	311	14.232808	121.133954	3	800	808
1268	Sc Dumilon Foods Enterprises	WALTERMART CABUYAO KM. 47	300	311	14.232694	121.134630	3	800	808
1269	Allen`S Gems And Jewels	WALTERMART CABUYAO KM. 47	300	311	14.232308	121.132628	1	1500	1501
1270	88 Motorcycles Inc.	FORAB BUILDING 	1100	1103	14.262719	121.127507	3	1800	1803
1271	Mel-Marose Rice And Sari-Sari Store	BLK20 LOT23 PH1 PUROK 5	1000	1012	14.269322	121.159572	1	1500	1513
1272	Via-Zone Hardware & Construction Supplies	#168	900	931	14.237384	121.168632	1	1500	1509
1273	Win Audio Enterprise		300	311	14.236287	121.134122	1	1500	1503
1274	Mrm Auto Electrical And Car Aircon		1600	1617	14.244722	121.124250	2	100	101
1275	Sc Dumilon Foods Enterprises	CENTRO MALL 	1600	1614	14.242146	121.131287	1	1500	1507
1276	Malibu Business Ventures	RLI  BLDG. 2 	200	216	14.242759	121.113252	1	1500	1517
1277	Justin Cj Home Builders	RCR BLDG.	1600	1614	14.248814	121.129342	1	1500	1506
1278	Jamilton Wood Craft	598 SITIO ILAYA	1100	1112	14.257999	121.128084	1	1100	1117
1279	Jerry Boboy Bakeshop	0815 J.P. RIZAL ST.	1500	1503	14.274294	121.124662	1	1500	1504
1280	Izbanda Enterprises		200	216	14.242359	121.113048	1	1800	1814
1281	Jemm Star General Merchandise	BLK7 LOT59 	1600	1602	14.245084	121.137400	1	1500	1509
1282	Mdd3 Food And Coolers	BAYAN WALK J.P. RIZAL ST.	1400	1404	14.276671	121.123717	3	800	808
1283	Djc Aluminum And Glass Services	B151 LOT 28 	900	913	14.239222	121.159376	2	1100	1104
1284	Bagsik Meat Shop	BLK41 LOT149 	1100	1110	14.271594	121.143496	1	1500	1504
1285	Dimple Star Transport Corporation	BLK1 LOT10 	200	216	14.244185	121.110458	2	1700	1711
1286	Cdj Machine Works	B3 L4 	1600	1603	14.243346	121.119436	2	1100	1111
1287	Del Monte Philippines, Inc.		700	703	14.230065	121.102465	1	1100	1105
1288	Totec Enterprises	BLK1 LOT13 	1600	1601	14.241515	121.127999	1	1500	1507
1289	Diwa Distrinet (South Luzon), Inc.	THE CENTRALE BLDG.	200	216	14.242001	121.112446	1	1500	1507
1290	Stev Ann Sari-Sari Store	#127 CORNER 	1500	1506	14.274865	121.123729	1	1500	1513
1291	Elajm Trading	BLK 1 LOT 7 	1000	1013	14.278330	121.145367	1	1500	1509
1292	M.V. Dizon Travel And Tours	#066 	1600	1622	14.249201	121.132494	2	1600	1603
1293	Dengemsan Incorporated		1800	1802	14.238015	121.132759	3	900	912
1294	De Jesus Ref And Aircon Services	PILMART MARKET	300	313	14.228786	121.139258	2	1200	1211
1295	Chris Gem Transport	BLK3 LOT13 	1800	1816	14.235775	121.136444	2	1700	1710
1296	Roanne Grace Enterprises	STALL 17-18 	1500	1502	14.277090	121.123432	1	1500	1507
1297	Alimagno Hogs Trading	#187 JADE ST 	1700	1722	14.267896	121.127034	1	1500	1504
1298	Redj Food Services		700	703	14.233795	121.093432	3	800	802
1299	Dengemsan Incorporated		300	317	14.229957	121.138069	3	900	912
1300	Dohjima (Y A) Corp.	CENTRALE BLDG. 	200	216	14.241998	121.112525	3	800	812
1301	Rizmy Hotel		1600	1617	14.243031	121.117884	2	600	601
1302	Aj 208 Commercial Building	#208	300	317	14.230100	121.138175	2	200	211
1303	Rodzel Vulcanizing Shop	BLK39 LOT10 PH1 	1000	1012	14.270633	121.153771	2	100	107
1304	Solomonic Consultancy	#288 	200	217	14.254995	121.128427	2	1400	1406
1305	Designsrus Co.	B1 L2 	1700	1704	14.269737	121.126462	2	1400	1408
1307	Dacar Corporation	FIRST SUMIDEN CIRCUITS INC. AMPERE ST. COR. MAIN AVE. 	700	703	14.233250	121.094055	3	800	802
1308	Edito Dela Cerna Apartment	#3830 	300	304	14.237411	121.134736	2	200	201
1309	Jeahann And Francisca Enterprises	SITIO BAGONG PAG-ASA	1600	1622	14.249122	121.132492	2	1700	1710
1310	F.Z.M. Auto Electrical And Motor Rewinding Services	#489 	1100	1103	14.262086	121.127666	2	100	106
1311	Creinnos Engineering Supplies Trading	#0586 	900	923	14.238608	121.171194	1	1500	1509
1312	El Plato Catering Enterprise	B5 L10 	1800	1816	14.235723	121.136372	3	800	803
1313	Motovega Motorcycle Parts And Accessories	130	1100	1112	14.262682	121.126625	1	1500	1516
1314	Dengemsan Incorporated (Pulo)	CENTENNIAL BUSINESS CENTER	1600	1617	14.246195	121.129545	3	900	912
1315	Dengemsan Incorporated	#110 	1600	1614	14.249562	121.129149	3	900	912
1316	Divinity Infinity Learning Center, Inc.	BLK127 LOT2 	900	913	14.241697	121.150238	2	500	503
1317	Childspace Therapy Center	#119	1800	1822	14.239681	121.138788	2	900	914
1318	Mjmd Labadali Laundry Shop	COMMERCIAL 2-111 	1100	1103	14.262816	121.127409	2	1200	1208
1319	Lerianne`S Food House	ELSOL FOODPARK 	1500	1502	14.276242	121.122782	3	800	808
1320	Double Mjm Food Hub	CENTROMALL	1600	1614	14.242351	121.131013	3	800	808
1321	Naomi`S Creative Printing	#206 	100	106	14.245527	121.169727	2	400	404
1322	Dolsar Trading Inc. (Baliwag Lechon Manok)	BLK 1 LOT 80 	200	210	14.255981	121.128552	1	1500	1504
1323	Envi-Triangle Scrap Trading	#196A 	1700	1713	14.274304	121.119788	1	1500	1515
1324	Cooltime Diamat Car Aircon Repair Services		1700	1713	14.269179	121.125351	2	100	101
1325	Lorese Consumer Goods Trading	BLK 2 LOT 7 	1000	1004	14.279398	121.143750	1	1500	1514
1326	Rnd Industrial Tools Supplies	BLK 47 LOT 2 	200	209	14.250798	121.127231	1	1500	1509
1327	Ronald Jay Delivery Services	BLK 16 LOT 24 	1600	1612	14.246474	121.132376	2	1700	1703
1328	Lbk Construction Supplies Trading	BLK 11 LOT 13 PH 1 	300	303	14.228151	121.137510	1	1500	1509
1329	Denz Lpg Trading	BLK 13 LOT 35 PH-4 	1000	1012	14.269343	121.159540	1	1500	1505
1330	Erd Lpg Trading	#127 JP RIZAL ST.	1700	1708	14.270585	121.125995	1	1500	1505
1331	Greg Dagmil Gas Retailing	BLK 3 LOT 37 	1200	1204	14.230263	121.092280	1	1500	1505
1332	Driving N Safety Transport Cooperative (Dns)		1600	1617	14.241629	121.116942	2	300	301
1333	Krystel And Bea Rice Retailing	BLK 1 LOT 33 PH 5 	800	816	14.260314	121.155018	1	1500	1504
1334	3Jad Construction Services	#031 	1000	1005	14.282234	121.144763	2	200	203
1335	Galeia Pharmacy	BLK 14 LOT 9 	1600	1620	14.244315	121.118826	3	900	912
1336	D & M Manufacturing Corporation	BLK 1-B LOT 19	1800	1817	14.242594	121.143423	1	1100	1113
1337	Dilasag Trading Services Opc	SITIO BULIHAN	1700	1723	14.273262	121.116397	1	1500	1507
1338	Depiedra Transport Services	BLK 68 LOT 18 	800	817	14.261904	121.151776	2	1700	1710
1339	Dimaano`S Bakery	BLK 1 LOT 6 	1000	1013	14.277924	121.145504	1	1500	1504
1340	Kornerkonbini Convenience Store	BLK 29 LOT 50	900	920	14.240174	121.149679	1	1500	1502
1341	Derecho Fruit And Vegetable Stall		1700	1702	14.273393	121.129278	1	1500	1504
1342	Dns Shuttle Service, Inc.		1600	1617	14.241624	121.116946	2	1700	1709
1343	Ms Ella Collection Fashion Boutique	BLK 12 LOT 43 DAMA DE NOCHE ST.	1600	1620	14.244790	121.119079	1	1500	1501
1344	Serafin Business Center	#223	300	317	14.230060	121.138145	2	200	211
1345	Marcsil Commercial Center		300	307	14.237072	121.143652	2	200	211
1346	Entrepreneur Rural Bank, Inc.	J.P. RIZAL ST.	1300	1302	14.278626	121.123073	2	700	702
1347	El Sol  Realty & Devt. Corporation	J.P. RIZAL ST.	1500	1503	14.277068	121.123416	2	200	216
1348	Lcsp Property Leasing	#136	1600	1622	14.249019	121.132402	2	200	211
1349	Christian Heritage Enterprise	#185	200	217	14.254865	121.128457	2	1400	1407
1350	Mholly Machine Shop & Engine Rebuilder	#198-C	1700	1713	14.268330	121.125981	2	1100	1111
1351	Emj Calibration Services	#11	300	317	14.230093	121.138299	2	100	101
1352	Empleo Commercial Unit Rental	BLK4 LOT2 PH2	1000	1012	14.269353	121.159540	2	200	211
1353	Maryland Pharmacy And General Merchandise	BLK4 LOT2	1000	1011	14.269901	121.143274	3	900	912
1354	Esl - Excellent & Smart Learning Institute,  Inc.	BLK17 LOT16	1800	1803	14.241719	121.136040	2	500	502
1355	Donesa Pharmacy And General Merchandise	# 117	1800	1822	14.239301	121.136854	3	900	912
1356	Bcb Marketing And Development Corp. (Phoenix Petroleum)		300	308	14.233456	121.134936	3	100	104
1357	Emmanuels` Christian School Of Cabuyao Laguna, Inc.	BLK17 LOT69	1000	1012	14.267611	121.154772	2	500	503
1358	Epzone Industrial Enterprises Inc.	#198	1700	1713	14.265842	121.126867	2	200	203
1359	Emkar Realty	BLK1 LOT45	1600	1601	14.241449	121.127963	2	200	219
1360	Roseric Lpg Center	#026	1000	1005	14.282087	121.144149	1	1500	1505
1361	Copyprocess Photocopying Services	214	1600	1622	14.241499	121.131748	2	400	403
1362	Everfirst Loans Corp.	K1 BLDG. BENT STREET	300	303	14.228482	121.138651	2	700	707
1363	Eric Lpg Trading		200	212	14.254714	121.128339	1	1500	1505
1364	David Brainell Transport Services	#500	1000	1009	14.275066	121.139724	2	1700	1711
1365	Rmesons Real Property Leasing		1700	1713	14.271251	121.123062	2	200	211
1366	Margie`S Meat Shop	PILMART MARKET	300	313	14.228822	121.139332	1	1500	1504
1367	Maribeth Elivera Building		300	308	14.230329	121.137413	2	200	211
1368	Jeff She Jeks Travel Services		1400	1402	14.277371	121.123621	2	1600	1603
1369	E.V. Peña Enterprises Inc.		1600	1617	14.242500	121.116837	2	1700	1711
1370	Ebitner Meatshop	B5 L8 P2	1000	1012	14.266947	121.155962	1	1500	1504
1371	Emmanuels` Christian School Of Cabuyao Laguna, Inc.	MAIN ROAD	800	813	14.260446	121.151939	2	500	503
1372	Easyfood Restaurants Corp.	THE CENTRALE BUILDING BLK 2	200	202	14.242120	121.112381	3	800	812
1373	Pabriel Construction	BLK 21 LOT 24	200	210	14.256857	121.132084	2	200	221
1374	Emmanuel Trucking Services	BLK 65 LOT 20 PH 3	1600	1602	14.245073	121.137503	2	1700	1711
1375	Abe Bills Payment And Remittance Center	BLK 211 LOT 39-41	900	913	14.238727	121.162174	2	700	708
1376	Edl Energy Saver Trading And Services Corporation	#143	500	504	14.289629	121.138336	2	1400	1407
1377	R.Espacio Packaging Supplies Trading	BLK 2 LOT 2	1600	1611	14.240659	121.131810	1	1500	1515
1378	C.R. Endencia Trucking Services	BLK 10 LOT 20	1600	1604	14.242243	121.135460	2	1700	1711
1379	Aeromatt Enterprises	LS SQUARE CABUYAO BLDG.	1700	1713	14.272325	121.121544	1	1500	1511
1380	Roseric Lpg Center	#245	400	410	14.291706	121.131478	1	1500	1505
1381	Erespe Pharma Corporation	7775 ME (ENTRRS)	1700	1713	14.271387	121.122909	3	900	912
1382	E&J Food Opc (The Brothers Unli Wings)	UNIT 2 JADE COMMERICAL BLDG. LOT 4 & 5	1600	1614	14.243870	121.131193	3	800	812
1383	Made To Wash Laundry Shop	BLK 1-D LOT 12 MAIN ROAD ST.	300	306	14.234818	121.137030	2	1200	1208
1384	Foresight Realty & Dev`T. Corp.		700	703	14.233223	121.094071	2	200	211
1385	Rose Princess Home	BLK 9 LOT 1-36 DURIAN ST.	1600	1613	14.278276	121.124758	2	900	905
1386	Salvador Ferraro Vegetable Store	PILMART MARKET	300	313	14.228705	121.139228	1	1500	1504
1387	G.G. Flores Fish Stall	PILMART MARKET	300	313	14.228714	121.139319	1	1500	1504
1388	Fortunate Credit & Loans Corp.	#16 J.P. RIZAL ST.	1500	1503	14.276621	121.124751	2	700	707
1389	Fortune Royal Gas Service, Inc.		1600	1617	14.242775	121.119664	1	1500	1505
1390	Forab Ii Development Corp.	#132	1100	1112	14.262654	121.126658	2	200	211
1391	Fortune Chicken Growing Corporation		1700	1702	14.273478	121.129287	1	1100	1101
1392	The Generics Pharmacy	BLK79 LOT1	100	103	14.242346	121.168555	3	900	912
1393	The Generics Pharmacy	UNIT 8&9 ENTRANCE	900	907	14.235234	121.157682	3	900	912
1394	The Generics Pharmacy	UNIT A BLK25 LOT1	900	919	14.228490	121.139636	3	900	912
1395	Fastech Employees Multipurpose Cooperative (Femco)	FASTECH MANUFACTURING COMPLEX AMPERE ST.	700	703	14.234568	121.092957	2	300	301
1396	Mylene And Benjie Fish Stall		1400	1402	14.277286	121.123691	1	1500	1504
1397	Tapsisters Sinangag Express	BLK 4 LOT 1 SOUTHPOINT SQUARE	200	216	14.242767	121.113811	3	800	808
1398	Funhouse Corporation	WALTERMART CABUYAO KM. 47	300	311	14.232400	121.133122	2	600	606
1399	Salvacion Flores Yakult` Beverage Trading	B24 L20 P3	200	211	14.263814	121.148127	1	1500	1507
1400	Fajie`S Foodhouse	CENTRO MALL CABUYAO	1600	1614	14.242266	121.131055	3	800	808
1401	Skyliquid Industrial Gas Trading		1700	1713	14.271154	121.123163	1	1500	1507
1402	Npf Enterprises	PH-2 MAIN ROAD	200	211	14.262759	121.144649	1	1500	1509
1403	Famsi Integrated Svcs Inc.	#131	200	212	14.252271	121.128677	2	1200	1206
1404	Danfa Glass And Aluminum Services		400	405	14.275938	121.128297	2	1100	1108
1405	Fcm Co.,Ltd.- Philippine Representative Office	BLK 10 LOT 6 AVOCADO ST.	1600	1613	14.246787	121.130322	2	1400	1402
1406	Rnbf Electrical Installation Services	BLK 18 LOT 7	1600	1602	14.245060	121.137389	2	1400	1407
1407	Arr Traders.Com Electric Power Generation Services	BLK 1 LOT 34	1200	1201	14.229300	121.089405	1	1500	1507
1408	Elegance Optical Clinic	#5 J.P. RIZAL ST.	1300	1302	14.278015	121.123246	3	900	911
1409	Far-Ed Meat Shop	#128	1600	1614	14.246215	121.130199	1	1500	1504
1410	Road Scape Motor Parts Supply	B180 L7H	900	913	14.238746	121.162019	1	1500	1516
1411	Sidecar Trading Orlly`S	BLK 10 LOT 16 PH3	900	928	14.240808	121.155907	2	100	102
1412	Giwu Pharmacy	BLK 206 LOT 15	900	913	14.238748	121.162087	3	900	912
1413	Mel-Bry Food And Beverage Kiosk (Kkopi Tea)	0063 NATIONAL HIGHWAY	300	311	14.232954	121.135374	3	800	809
1414	Francisco Patisserie Corp. (Julie`S Bakeshop)	WALTERMART CABUYAO KM. 47	300	311	14.232878	121.134783	1	1500	1504
1415	Ramon Fontanilla Processed Foods Manufacturing	#1156	900	924	14.238612	121.171191	1	1100	1105
1416	Joseph En Jenn`S Catering Service	BLK 4 LOT 10 PH 2-B	500	508	14.281997	121.141751	3	800	803
1417	Mike Dacillo Febre Vulcanizing Shop	#108	1600	1614	14.249544	121.129163	2	100	107
1418	A.M. Pharmagen Health Care Products Trading	BLK 12 LOT 84	1000	1011	14.275684	121.143555	3	900	912
1419	Grand Progressive Mfg., Inc.	KM. 48	1600	1622	14.248982	121.132233	3	1100	1116
1420	Gel Pacific, Inc.	4/F INTERPHIL LABORATORIES INC.	1200	1205	14.225121	121.078036	1	1100	1103
1421	Mmg`S Trading	NO.3 UNIT C DON ONOFRE BLDG. F.B. BAILON ST.	1700	1720	14.272376	121.124487	1	1500	1514
1422	Sundrel Space Rental And Business Center	# 25 SUNDREL BUSINESS CENTER	1700	1723	14.272312	121.125346	2	200	211
1423	Gelvero Motorworks		1600	1622	14.248837	121.139281	2	100	106
1424	Lady Of Rose Academy, Inc.	BLK10 LOT14 16 & 17	1700	1720	14.273299	121.124044	2	500	503
1425	Son-Shine Glass & Aluminum Fabrication	# 160	1700	1723	14.267160	121.127052	2	1100	1108
1426	San`S Bakeshop	#122	200	212	14.255970	121.128142	1	1500	1504
1427	C.E. Garcia Trading		1400	1402	14.277461	121.123850	1	1500	1515
1428	Ramilo`S Electro-Mechanical Services	#464	900	931	14.236624	121.166769	2	100	101
1429	Wardz General Merchandise		900	922	14.234979	121.152076	1	1500	1507
1430	M.H.Garcia Building	#150	300	317	14.229986	121.138206	2	200	211
1431	Golden Hand Labor Service Cooperative	#33 J.P. RIZAL ST.	1700	1708	14.269673	121.126102	2	300	301
1432	Mkg Enterprises	#1028	900	931	14.237780	121.152535	3	1800	1810
1433	C.B. Guillermo Enterprise	BONIFACIO ST.	1400	1401	14.277320	121.125168	1	1500	1504
1434	Checkstop Automotive Care Services		1700	1713	14.271709	121.122647	2	100	103
1435	Rrgtech Solution	BLK169 LOT30	900	913	14.238736	121.162025	1	1500	1507
1436	Gustilo Orthopaedic Research Inc.		700	703	14.236195	121.102033	2	900	221
1437	Globe Telecom, Inc. (Baclaran)		100	106	14.246105	121.169560	2	1000	1009
1438	Ccg Bikeshop	#242	300	317	14.229972	121.138327	1	1500	1516
1439	Cmgb Sari Sari Store	#548 UNIT C MIRASOL PUA BLDG.	900	924	14.238621	121.171065	1	1500	1513
1440	Ellti Enterprises	B1 L20-A-1	1800	1819	14.242212	121.139299	2	1400	1407
1441	Golden Dragon Motorsales Corp. (Super Bikes Center)	BLK7 LOT3	1600	1611	14.240840	121.131966	1	1500	1507
1442	Teresita Garcia Flowers And Gift Shop	#108	1600	1622	14.249065	121.132226	3	1500	1515
1443	Grl Generic Drug And General Merchandise Company	#118 BONIFACIO ST.	1400	1401	14.277442	121.125536	3	900	912
1445	Iced Design And Prints	UNIT 2-C RLI BLDG. 2 BLK4 LOT2	200	216	14.242811	121.113440	2	400	404
1446	Empower Water Refilling Station	BLK14 LOT7	100	101	14.245073	121.169655	1	1500	1517
1447	Gerry And Lucy Enterprises	CENTENNIAL BUSINESS CENTER	1600	1617	14.246180	121.129559	1	1500	1504
1448	Infinity Biomedical Enterprise	B2 L64	1000	1001	14.274010	121.149732	2	900	907
1449	F.P. Giray Construction & Development Services	B2 L115 DEPANTE ST. A	200	215	14.257987	121.145138	2	200	203
1450	Jerem Electro-Mechanical Services	BLK6 LOT30	200	210	14.256862	121.132083	2	1200	221
1451	4M Scrap Materials Trading	#22	100	104	14.247323	121.169237	1	1800	1814
1452	Green Farms Anshin Philippines Inc.	KPI INC. WAREHOUSE	1600	1617	14.239664	121.105707	2	1400	1402
1453	Geofuel Corporation	6-4L COMPOUND	1600	1617	14.242550	121.116992	3	100	104
1454	Zedric Janbon Loading Station	BLK10 LOT5 PH1	900	904	14.237716	121.155226	3	1500	1503
1455	Joel Garcia Building		1700	1723	14.266686	121.118074	2	200	211
1456	Goldilocks Bake Shop, Inc.	SM SAVEMORE MARKET J.P RIZAL ST.	1400	1404	14.278307	121.124732	1	1500	1504
1457	Greentelcommunications Trading, Inc. (Vivo)	WALTERMART CABUYAO KM. 47	300	311	14.232348	121.132579	1	1800	1805
1458	Greentelcommunications Trading, Inc. (Samsung)	WALTERMART CABUYAO KM. 47	300	311	14.232662	121.134828	1	1800	1805
1459	Grandway Industrial Manufacturing Corp.	9002 WEST RD.SCIENCE PARK	700	703	14.234789	121.092594	1	1100	1114
1460	Ultimate Ejs Fuel Station And General Merchandise		1700	1713	14.270971	121.123369	3	1500	1502
1461	Geofoods Services Inc.	G-4L COMPOUND	1600	1617	14.242450	121.117199	3	800	812
1462	Mdgallardo Enterprise	BLK 26 LOT 6 & 7	900	919	14.242975	121.151106	1	1500	1504
1463	Grm Home Style Cooking Inc.	AUTOMATED TECHNOLOGY (PHILS.) INC. HOLOGRAM ST.	700	703	14.236183	121.108486	3	800	802
1464	Ar.Blacs Residential Building Construction	B12 L24 SIEV	1800	1822	14.241286	121.136515	2	200	221
1465	Vitali Water Refilling Station	BLK 14 LOT 15 PH 1	1800	1816	14.235762	121.136378	1	1500	1517
1466	Ggaz Mobility Inc. (Shell Gas Station)		400	405	14.277114	121.134638	3	1500	1502
1467	Gupta Furniture Trading	BLK 23 LOT 24	1800	1803	14.240318	121.136777	1	1500	1506
1468	Good Workers Transformation Center, Inc.	NIA ROAD	1700	1714	14.268931	121.132862	2	500	505
1469	Jcrg Engineering Consultancy Services	BLK25 LOT2	1600	1602	14.245084	121.137324	2	1400	1406
1470	Grm Home Style Cooking Inc.	NEXPERIA	700	703	14.230296	121.095845	3	800	807
1471	Gomz Food Products Trading	#0194	900	924	14.234928	121.153805	1	1500	1504
1472	Reymar Minimart	BLK 34 LOT 5	200	209	14.250619	121.127485	1	1500	1502
1473	Jhar Lpg Store	#5	1800	1822	14.239391	121.143063	1	1500	1505
1474	Gomags Car Care Center Corp. (Dunlop)	LOT 3826 RI	1600	1614	14.239186	121.132661	3	100	103
1475	Southpoint Auto Care Center (Rapide)	BLK 7 LOT 7	200	216	14.242373	121.113158	2	100	101
1476	Pammati Delivery Services	BLK 1 LOT 15	300	306	14.234694	121.137086	2	1700	1703
1477	Antonio Lot Leasing		400	411	14.293037	121.130276	2	200	215
1478	Marvs`Gha Sushi Food Stall	ELSOL FOOD PARK	1500	1502	14.275785	121.122436	3	800	808
1479	Joshua Guillermo Consumer Goods Trading	CORNER M.L. QUEZON ST. A. BONIFACIO ST.	1400	1401	14.278618	121.123866	1	1500	1507
1480	Tongie Sari-Sari Store	#130	300	312	14.230914	121.136941	1	1500	1513
1481	Marcela`S Consumer Goods Trading	#132	300	312	14.230845	121.137007	1	1500	1504
1482	Jeffren Eatery	#236	300	317	14.229885	121.138147	3	800	805
1483	T2G2 Construction Services		600	605	14.204963	121.039774	2	200	203
1484	Xym Clothing Shop	BLK 19 LOT 23 PH 2	200	211	14.263246	121.144381	1	1500	1501
1485	`Prince Rich` Sari-Sari Store	BLK 35 LOT 62	1600	1602	14.246713	121.137429	1	1500	1513
1486	Edith`S Sari-Sari Store	BLK 211 LOT 42	900	913	14.238561	121.162009	1	1500	1513
1487	Mac.G Coffee Shop (Calle Co)	BLK 10 LOT 12	200	210	14.257151	121.133750	3	800	804
1488	Nutri-Asia, Inc. (Ufc Philippines)		700	703	14.231706	121.102259	3	1100	1103
1489	Hain`S Trading & General Services	#378	1100	1112	14.261895	121.129600	3	800	812
1490	Himpisao Feeds & Agri Supply		300	314	14.230978	121.143714	1	1500	1507
1491	Bell Water Station		300	314	14.230950	121.143487	1	1500	1517
1492	American Dental Products, Inc.	#0444 VH COMPOUND	200	217	14.254885	121.128454	3	1800	1811
1493	Hrd Specialty Clinic And Diagnostic Services, Inc.	#250	300	307	14.228162	121.139479	2	900	903
1494	B. Hemedez Newstand & Magazine Stand		1400	1402	14.277529	121.123867	1	1500	1515
1495	Mhapinat Rice Store		1400	1402	14.277448	121.123976	1	1500	1504
1496	Villarica Pawnshop (Brgy. 1-Branch )	#256 J.P. RIZAL ST.	1300	1302	14.277800	121.123127	2	700	709
1497	Villarica Pawnshop ( Banlic-Branch )		300	307	14.228459	121.139634	2	700	709
1498	Suri Pest Management Services	#347	1100	1112	14.262882	121.126437	2	1200	1209
1499	Suri Pallet Making & Woodworks	#347	1100	1112	14.264694	121.127266	1	1100	1113
1500	Adtek Trucking Inc.		300	307	14.229130	121.140697	2	1700	1705
1501	Triple H Commercial	#199 J.P.RIZAL ST.	1300	1302	14.281546	121.116118	2	200	211
1502	The Generics Pharmacy	#28	200	212	14.256617	121.128100	3	900	912
1503	Quality Labor Service Cooperative (Qlsc)	#0253 LA DELFINO ST.	1700	1703	14.275294	121.132561	2	300	301
1504	Josh&Hann Pharmacy (The Generics Pharmacy)		1600	1614	14.258608	121.127644	3	900	912
1505	Holy Rosary Of Cabuyao Hospital, Inc.		1700	1720	14.272179	121.123846	2	900	906
1506	Himpisao Meat Shop	PILMART MARKET	300	313	14.228723	121.139399	1	1500	1504
1507	Waste Care Junkshop	BULIHAN	1700	1723	14.271935	121.116193	3	1800	1810
1508	Hizon Trucking Logistics, Inc.	#9029	1700	1713	14.270835	121.123532	2	1700	1711
1509	Himpisao Building		900	923	14.241783	121.164432	2	200	211
1510	Hosanna Technological School Of Arts And Sciences, Inc.	HCA BLDG. BERLIN ST.	500	508	14.283529	121.139368	2	500	503
1511	Rch.Enterprises Scrap Metal Wholesaling	#6685	1800	1822	14.240362	121.142863	3	1800	1810
1512	Carmelita A. Habal Enterprises	1-A	400	405	14.277926	121.135640	2	200	211
1513	Yuna Fuel		200	213	14.255677	121.136535	3	100	104
1514	Hurt Aj Fabrication Enterprises And Construction Company		1800	1802	14.237214	121.130281	2	1100	1104
1515	Jvh Arcade	MAMATID ROAD	300	313	14.229823	121.141739	2	200	211
1516	E.G. Herce Enterprises	#129	300	317	14.230415	121.137912	2	1700	1711
1517	Mary Grace H. Hain Trading	#123	1100	1112	14.262693	121.126775	1	1500	1507
1518	Marilyn A. Hernandez Animal Bite Clinic	F. BAILON ST.	1700	1706	14.272529	121.124343	2	900	901
1519	Mikniah Gasoline Station	BLK5 LOT33	200	205	14.257873	121.135118	3	100	104
1520	Cheatday Food Truck	B-2 L-2	200	216	14.242261	121.112970	3	800	808
1521	Aka Enterprise		1700	1718	14.271456	121.125667	2	1700	1711
1522	A.C. Audioforce Lights And Sounds Rental	316-A	900	923	14.238302	121.165622	2	600	607
1523	Mikniah Gasoline Station		600	607	14.186544	121.030444	3	100	104
1524	Hard Discount Philippines, Inc. (Dali Store)	GF FPC BUILDING	1100	1112	14.259692	121.127579	1	1500	1508
1525	Chubibo Food Services	DIVIMALL PULO	1600	1614	14.243073	121.131683	3	800	808
1526	Emmyn Jade Trucking Services	BLK LOT13 L22 PH1	300	302	14.227795	121.137643	2	1700	1711
1527	Dreamjs Travel Services	#0253 LE DELFINO ST.	1700	1703	14.275306	121.132662	2	1600	1603
1528	Hard Discount Philippines, Inc. (Dali Store)		1800	1812	14.238568	121.135256	1	1500	1508
1529	Hard Discount Philippines, Inc. (Dali Store)	BLK 1 LOT 9	1000	1013	14.277890	121.145572	1	1500	1508
1530	Hdec-Dongah Joint Venture		1100	1104	14.262915	121.126568	2	1100	1102
1531	Ephraim Property Rental	#238	400	410	14.291653	121.131544	2	200	211
1532	Nla Lpg Center	STALL #5	200	210	14.255992	121.128600	1	1500	1505
1533	Eats-A-Rap Food Hub	HIMPISAO BUILDING	900	923	14.241752	121.164429	1	1500	1504
1534	Roderick Lpg Store	BLK 3 LOT 12	700	704	14.227264	121.093809	1	1500	1505
1535	Hard Discount Philippines, Inc. (Dali Store)		400	411	14.294303	121.129359	1	1500	1508
1536	Juskie`S Burger Stand	REY-SAL BUILDING EL SOL PLAZA	1400	1403	14.277280	121.123057	3	800	801
1537	Herce`S Commercial Building	MAMATID ROAD	300	313	14.228086	121.139077	2	200	211
1538	Hard Discount Philippines, Inc. (Dali Store)		400	405	14.277955	121.136459	1	1500	1508
1539	3R & E Food And Beverage Kiosk (Potato Corner)	JVH ARCADE BLDG.	300	313	14.228640	121.139878	3	800	808
1540	Hyundai Engineering & Construction Co., Ltd.	SB HAIN COMPOUND	1100	1104	14.262910	121.126581	3	1800	1809
1541	Iris Development Corporation	BLK3 LOT3 AMPERE ST.	700	703	14.235264	121.093078	2	200	212
1542	Institute For Foundational Learning Inc.	IFL COMPOUND	1800	1818	14.247452	121.147544	2	500	503
1543	Ionics Ems, Inc.	CIRCUIT ST.	700	703	14.236743	121.097432	1	1100	1114
1544	Mother Earth Travel And Tours		1600	1617	14.242433	121.116374	2	1600	1603
1545	Infant Jesus Montessori Center Inc.  - (  Branch 2 )	BLK 214 LOT 1-39	900	914	14.238440	121.152425	2	500	503
1546	Ispl Employees Multi-Purpose Cooperative	#1 HOLOGRAM ST. CORNER	700	703	14.235574	121.107845	2	300	301
1547	Mabuhay Botica Ng Barangay Pharmacy Co.	BLK25 LOT41	100	103	14.242799	121.169325	3	900	912
1548	Ithaca Inc.	MAIN AVE. DIODE ST.	700	703	14.235885	121.100204	1	1100	1114
1549	Ismaro Fast Movers Corp.	#252	1700	1720	14.271676	121.123235	2	1700	1711
1550	Island Air Products Corporation	BLK1 LOT17 18 19	1800	1803	14.240389	121.136725	1	1500	1505
1551	Inland Corporation		1600	1617	14.242083	121.115953	2	1700	1711
1552	Ml Itable Realty	BLK11 LOT1	900	926	14.236969	121.152478	2	200	203
1553	Iconstructors And Developers, Inc.	BLK18 LOT27 ACACIA ST.	1600	1612	14.238831	121.129709	2	200	208
1554	Infarmco Foundation, Inc.		1800	1822	14.246158	121.143944	2	1400	1411
1555	Kjnd Delivery Services	BLK20 L2OT8 VALENCIA ST.	900	913	14.238567	121.162083	2	1700	221
1556	Iñigo & Bianca Corporation	WAREHOUSE #5 	200	205	14.253872	121.129240	3	1800	1806
1557	J. Icalla Rice Store	BLK42 LOT52	1100	1110	14.271653	121.143477	1	1500	1504
1558	Ionics Products Solutions, Inc.	CIRCUIT ST.	700	703	14.236756	121.097418	1	1800	1805
1559	Intac System Solutions Corp.		1800	1822	14.237648	121.130076	3	1800	1816
1560	Scnr Poultry Supply	#350	100	106	14.243905	121.170192	1	1500	1515
1561	Ifl Integrated Community Development Ministries Inc.		1800	1806	14.238328	121.135239	2	1400	1411
1562	Inkmaker, Inc.	BLK 7 LOT 3 ION ST. COR. EAST ROAD	700	703	14.235422	121.110342	3	1100	1116
1563	Sanbmi Laundry Services	SAN BMI BLDG.	300	317	14.230267	121.137366	2	1200	1208
1564	Musclecontrol Gym	GBRDI BLDG. DIVI MALL	1600	1614	14.243499	121.132007	2	1300	1304
1565	Tonny Watersy Water Refilling Station	BLK 36 LOT 6	900	921	14.242914	121.155836	1	1500	1517
1566	R.P.Joson Freight Services	#10	200	217	14.254752	121.128478	2	1700	1711
1567	Asj Medical & Diagnostic Clinic	2ND FLOOR CENTENNIAL BUILDING.	1600	1622	14.246343	121.129599	2	900	903
1568	M. Lhuillier Pawnshop & Jewelry And Ml Kwarta Padala	NO. 216	300	308	14.229230	121.138124	2	700	708
1569	M. Lhuillier Pawnshop & Jewelry And Ml Kwarta Padala	NO. 216	300	308	14.231230	121.138824	2	700	709
1570	Aqua Jardeleza Purified Drinking Water	B18 L56 P2	300	315	14.238123	121.138779	1	1500	1517
1571	Onil Tiles Center		1700	1713	14.271403	121.122890	1	1500	1506
1572	Joshua- Kyla Trading	BLK151 LOT6	900	913	14.238527	121.162092	1	1500	1515
1573	Pangga Marketing	PULO-SAN ISIDRO RD.	1600	1618	14.233620	121.133581	2	1700	1711
1574	Sevenlands Realty And Marketing Services	#188	300	317	14.230503	121.138063	2	200	219
1575	Star Harvest Rice Trader	#55	200	217	14.255124	121.128300	1	1500	1504
1576	Billy Tube Ice Corporation	4450 BE UNIT A	300	308	14.230250	121.137502	1	1500	1515
1577	Joselle Hauling, Shuttle And Delivery Services	#23	1700	1723	14.266598	121.117933	2	1700	1711
1578	Jnl Juneric Trading, Inc.	BLK3 LOT3	200	209	14.255410	121.128265	1	1500	1507
1579	Jaselm Plastic Trading		1700	1702	14.273529	121.129326	1	1500	1515
1580	Macjim Enterprises	BLK17 LOT32	1600	1601	14.241780	121.128529	1	1500	1514
1581	Sean Jhon Water Station	BLK-17D LOT18	300	306	14.235040	121.137824	1	1500	1517
1582	Jare Enterprises, Inc.	#1 MARINIG ROAD CORNER NIA ROAD	1700	1702	14.275945	121.128375	1	1500	1516
2070	Rhose Ann Voluntad Corp.		400	410	14.292007	121.131190	2	1700	1711
1583	Jedistar Realty And Leasing Corporation	ABACUS COMMERCIAL CENTER	1800	1822	14.244264	121.139642	2	200	211
1584	Jtb Lucky Boutique And Marketing Corporation	SERAFIN BUSINESS CENTER	300	308	14.228320	121.138629	1	1500	1501
1585	Sachlosha Ventures (7-Eleven)	#108	1600	1614	14.246423	121.129587	3	1500	1502
1586	Jobcrest Management Inc.	EASTLAND PROPERTY BLK 1	1600	1622	14.243255	121.131339	2	1400	1407
1587	Tagalog Trading And Construction	B41 L30	1800	1816	14.235670	121.136444	2	200	221
1588	Joshua-Kyla Trading		200	213	14.256041	121.137032	1	1500	1515
1589	Jumbolito`S Food Products Inc. (Don Benito`S Cassava Cake)	J.P. RIZAL AVE.	1500	1503	14.273735	121.124814	1	1500	1504
1590	Jumbolito`S Food Products Inc. (Don Benito`S Cassava Cake)		200	212	14.252100	121.128916	1	1500	1504
1591	Luvicon Fashion House Opc	BLK 6 LOT 13	200	205	14.254615	121.129519	3	1100	1106
1592	Donmer Lpg Trading	#201	1800	1822	14.242634	121.142005	1	1500	1505
1593	Junkman Recycling Center Incorporated	4065A	1800	1822	14.250070	121.153783	3	1800	1814
1594	Pmp Pain Center Corporation	LS SQUARE UNIT 6A	1700	1713	14.272413	121.121548	2	900	914
1595	Mondijar Commercial Lot And Building Rental	#173	1100	1103	14.262839	121.127490	2	200	211
1596	Vet Refurblic Animal Clinic	#4	300	311	14.232608	121.135514	3	900	917
1597	Cakes&Crumbs Bakeshop	#105	1500	1504	14.276402	121.126168	1	1500	1504
1598	Ja Rin Property Incorporated		200	212	14.252195	121.128653	2	200	211
1599	Rgj Food Hub (Takoyatea By Joel Cruz)	UNIT 201 2ND FLR. COMERCIO CENTRALE	1600	1614	14.241857	121.131581	3	800	812
1600	Jimenez Lpg Store	126-B	400	408	14.286403	121.129061	1	1500	1505
1601	Joelen`S Lending Services Corporation	BLK 44 LOT 184 PH 11	1100	1110	14.271591	121.143584	2	700	707
1602	Dr-A Health And Beauty Products Shop	BLK 38 LOT 2	900	920	14.240211	121.149656	1	1500	1510
1603	3 J`S Consumer Goods Store	BLK 40 LOT 1	1600	1602	14.245341	121.137397	1	1500	1504
1604	Kababaihan Kaibigan Ng Bigaa Multi-Purpose Cooperative (Kabig Mpc)		400	414	14.285298	121.129331	2	300	301
1605	M.J. Kim Trading (Branch)		1100	1103	14.262849	121.127408	1	1500	1516
1606	Kalbasa Corp.	UNIT 6 FUSION ST.	700	703	14.236824	121.103540	1	1800	1816
1607	Kosca Building Rental	#221 BENT ST. KOSCA BLDG.	300	302	14.228437	121.138397	2	200	211
1608	Kettle Foods Corporation	WALTERMART CABUYAO KM. 47	300	311	14.232561	121.132822	1	1500	1507
1609	Katecs Philippines, Inc.	BLDG. 4 B7 L3 CIRCUIT ST.	700	703	14.236154	121.098186	1	1100	1114
1610	Kareila Management Corporation	JY WAREHOUSE	700	702	14.235469	121.111474	2	1700	1713
1611	Kanban Autoparts Inc.	#41 STALL B	1700	1703	14.270627	121.123932	1	1500	1516
1612	Lakeside And Kim`S Realty Services	PH 1  	200	211	14.263950	121.144223	2	200	211
1613	King A`S Toolmaster And Indl. Corp.	BLK 16 LOT 8 GOLD ST.	200	204	14.254140	121.131870	2	1100	1104
1614	Ko3 Enterprise Inc.		900	922	14.233081	121.147690	2	1100	1104
1615	Kimgoldwin Trading Corporation	BLK4 LOT-20A 	200	205	14.253805	121.128645	3	1800	1808
1616	King & Quinn`S Place Opc (Reyes Haircutters)	2/F SERAFIN BUSINESS CENTER	300	308	14.228404	121.138760	2	1300	1303
1617	Korea Development Service Global Inc.	BLDG. 4 PANORAMA COMPOUND HOLOGRAM ST.	700	703	14.233235	121.109110	2	200	203
1618	Lexonic Hardware & Construction Supplies		1800	1808	14.238758	121.132831	1	1500	1509
1619	Glorious Paint Center & Gen. Merchandise		1600	1622	14.240705	121.132344	1	1500	1506
1620	Lisp-I Locators Association Inc.	ADMIN BLDG.	700	703	14.237197	121.102072	2	1400	1411
1621	Liceo De Mamatid		900	931	14.234981	121.158348	2	500	503
1622	Ell Accounting Firm	# 077	400	407	14.284646	121.128021	2	1400	1401
1623	Treasure Rock Mover Enterprises		1600	1617	14.241534	121.122234	2	1700	1705
1624	Mark Liwanag Rice Dealer		1400	1402	14.277367	121.124034	1	1500	1504
1625	Liceo De Cabuyao	MABINI ST.	1300	1305	14.279802	121.124533	2	500	503
1626	Gheian`S Store	BLK28 LOT196	900	919	14.241313	121.149793	1	1500	1513
1627	Lazo Sari-Sari Store	#067	400	407	14.284540	121.127929	1	1500	1513
1628	V. Lebrilla Fireworks	#73	400	414	14.285060	121.129488	1	1500	1515
1629	Loscam (Philippines) Inc.	BLK10 LOT-3A ION ST.	700	703	14.234399	121.111015	2	1700	1713
1630	Yupyup Food House	J.P. RIZAL ST.	1300	1302	14.277637	121.123405	3	800	805
1631	Woodhill Integrated School, Inc.	BLK31 LOT24 PH1	1800	1816	14.238998	121.139561	2	500	502
1632	Lbc Express, Inc. - Banlic Branch	#150 NATIONAL HIGHWAY	300	313	14.230137	121.137482	2	1700	1704
1633	David & Jackie Junkshop		1000	1005	14.279048	121.145434	3	1800	1810
1634	Living Stone Lending Investor Inc.	#132 UNIT F	1100	1112	14.278277	121.124758	2	700	707
1635	Salon De Sta. Rosa Atbp...	#223	300	308	14.228350	121.138989	2	1300	1303
1636	M. Lhuillier Pawnshop & Jewelry/ Ml Kwarta Padala	#112	200	212	14.256299	121.128332	2	700	709
1637	Lolaley Enterprises	#216	300	308	14.228162	121.139032	1	1500	1510
1638	Rc Landicho Store		1400	1402	14.277326	121.123941	1	1500	1513
1639	Jna Gasoline Station		400	405	14.278117	121.136740	3	100	104
1640	Glc Forwarder	B14C L6 MIERES ST.	300	306	14.234325	121.136808	2	1700	1704
1641	Larsons And Daugh Surveyors Corporation	BLK2 LOT6  PH2A	300	303	14.228810	121.136456	2	1400	1410
1642	Emma Dressed Chicken Store	PILMART MARKET	300	313	14.228622	121.139279	1	1500	1504
1643	Ambo Pur Purified Drinking Water Refilling Station	BLK7 LOT22 PH2	300	315	14.239155	121.136801	1	1500	1517
1644	La Vecina At Dos Rios Homeowners Association, Inc.		1200	1205	14.229304	121.089397	2	1400	1411
1645	Maflex Marketing And Industrial Center	#99	200	212	14.252177	121.128673	2	1100	1110
1646	Linda Holdings, Inc.	WEBFORGE BLDG. MAIN AVE. CORNER HOLOGRAM ST.	700	703	14.235205	121.108247	2	700	705
1647	Jna Gasoline Station		900	931	14.232335	121.146643	3	100	104
1648	Cyruzken Fruit Stand		1400	1402	14.277448	121.123788	1	1500	1504
1649	Luz And Guiller Gasoline Station	# 1072	900	931	14.237291	121.150972	3	100	104
1650	Kye Food Hub	CENTRO MALL	1600	1614	14.242608	121.131244	3	800	808
1651	Lifebank Microfinance Foundation, Inc.	SAPPHIRE ST.	1700	1723	14.266474	121.117924	2	700	703
2142	Smsp Phoneshop Inc.	#216	300	317	14.228799	121.138442	1	1500	1503
1652	Klaire Printing Services	#79	1100	1112	14.262915	121.126712	2	400	404
1653	Lbc Express, Inc. (Waltermart - Banlic)	WALTERMART CABUYAO KM. 47	300	311	14.232374	121.134523	2	1700	1702
1654	Twintigers Ventures Inc.		200	217	14.257170	121.135926	2	1700	1711
1655	Booguel`S Hardware	#48	600	602	14.178919	121.024126	1	1500	1509
1656	Lbc Express, Inc. (Centromall - Pulo)	CENTRO MALL	1600	1614	14.242769	121.127014	2	700	708
1657	Ascl Learning Center Inc.	NO. 575	1100	1112	14.258425	121.128005	2	500	503
1658	Lettered L Food Services, Inc.	C/O PRICON MICROELECTRONICS INC. SEPZ	700	703	14.232213	121.093278	3	800	802
1659	Dina`S Carl Fashion Boutique	UNIT 110-112 CENTRO MALL	1600	1614	14.243128	121.130492	1	1500	1501
1660	Brll Leasing	BLK17 LOT-20A	1600	1601	14.241926	121.128454	2	200	211
1661	Citiwide Trading	BLK 1 LOT 8	1000	1013	14.278294	121.145416	1	1500	1509
1662	Xavi Sari-Sari Store	BLK1 LOT16	300	306	14.235006	121.137777	1	1500	1513
1663	Edl Energy Saver Trading And Services	#143	500	504	14.289627	121.138331	1	1500	1515
1664	Layba Trucking Services	BLK22 LOT11	1800	1816	14.235702	121.136489	2	1700	1710
1665	Kwan8Del Enterprises		1400	1402	14.277447	121.123732	1	1500	1507
1666	Grand Place South Bldg.	B7 L2 GPS BLDG.	200	216	14.243876	121.114156	2	200	211
1667	Lumino Internet And General Merchandise	GPS BLDG. 3	200	216	14.243901	121.114000	3	1000	1004
1668	Lucky J Glass, Aluminum And Steel Works	#45	1800	1822	14.237731	121.133501	2	200	203
1669	Jpl And Liam Auto Supply	#96	200	217	14.252942	121.128556	1	1500	1516
1670	Dendex Enterprises	369 B	1000	1009	14.274984	121.139543	1	1500	1515
1671	Lurk Security Agency	538	1100	1103	14.260136	121.127855	2	1400	1414
1672	Luzon Ogico Inc.	10 BINARY ST.  SEZ	700	703	14.233254	121.095897	3	1800	1816
1673	Fajie`S Foodhouse	CENTROMALL CABUYAO	1600	1614	14.242577	121.131180	3	800	808
1674	Lazada E-Services Philippines, Inc.	BLK3 LOT21 	200	206	14.253696	121.128691	2	1700	1713
1675	Limbell Travel And Transport Inc.	17 J.P. RIZAL ST. GF LIMBELL BUSINESS CENTER	1500	1503	14.275002	121.124310	2	1700	1710
1676	Smilebrity Enterprises	BLK26 LOT9	200	207	14.249852	121.128695	1	1500	1515
1677	Cals-Tech Industrial Supply	B17 L37	1600	1601	14.240099	121.126306	1	1500	1507
1678	Cabuyao Phoneshop And Gadgets Trading Inc.	#211	300	313	14.229643	121.137852	1	1500	1507
1679	Lazada E-Services Philippines, Inc.		1600	1617	14.242014	121.115770	2	200	211
1680	Gilmar`S Gas Station		800	812	14.249687	121.168769	3	100	104
1681	Lbl Prime Properties, Inc.		1600	1617	14.242443	121.116331	2	200	211
1682	Fatty And Issa Store	#17	1600	1622	14.249185	121.132185	1	1500	1513
1683	Cwbl Realty	BLK42 LOT1,2,3	900	920	14.240194	121.149645	2	200	211
1684	Cwbl Realty	BLK211 LOT39-41	900	913	14.238540	121.162148	2	200	211
1685	Instyle Trading	BLK93 LOT41	900	912	14.242237	121.168568	1	1500	1511
1686	Stegel Enterprises	27 JP RIZAL ST.	1500	1503	14.274754	121.124475	1	1100	1106
1687	Mom`S Miracle Maternity Clinic	#194	1000	1006	14.276487	121.150156	2	900	908
1688	Czar`S Apartment Rental	BLK 2 LOT 8-10	1800	1819	14.242220	121.139377	2	200	201
1689	Fill - Up Gasoline Station		200	213	14.256578	121.136180	3	100	104
1690	Llch Plastic Products Manufacturing		200	213	14.257304	121.139854	1	1100	1115
1691	Riverside Hardware		400	411	14.292587	121.130657	1	1500	1509
1692	Angels Packaging Supplies	BLK 3 LOT 17/19	200	210	14.256001	121.128639	1	1500	1515
1693	Kers Electronics Shop	BLK 9 LOT 31 PH 2	1000	1012	14.269221	121.159449	2	1000	1007
1694	Jamille Insurance Agency	BLK 10-A LOT 5 SARAGOZA ST.	300	306	14.234404	121.136971	2	700	706
1695	D Rays Zone Helmet Shop	#123	300	317	14.230564	121.138226	1	1500	1516
1696	Amore-Pasta Cafe	BLK 14 LOT 83 PH 5	800	816	14.263546	121.156066	3	800	812
1697	Alkc Property Leasing	#123	1500	1501	14.275113	121.120872	2	200	214
1698	Labubbles Laundry Services	BLK 220 LOT 48-A	900	913	14.241050	121.160684	2	1200	1208
1699	Cyron And Cyryl Dressed Chicken Trading	NIA ROAD	900	922	14.233122	121.147690	1	1100	1105
1700	Kim Lpg Store	B9 L17 OMV2	1800	1822	14.244209	121.139607	1	1500	1505
1701	Nwow Marketing	A&H COMMERICIAL BLDG.	300	312	14.230816	121.137042	3	100	106
1702	Latayan Lpg Store	BLK 24 LOT 6	200	209	14.250593	121.127578	1	1500	1505
1703	E.A.L. Enterprises	#218	300	308	14.228298	121.138935	3	800	811
1704	L.P.T. Marketing Company Inc. ( Ultra Mega Multi Sales )	#168	900	922	14.234889	121.153192	1	1500	1508
1705	Jhoy`S Aesthetic Center	#186 VICENTE DRIVE	1500	1502	14.275819	121.122600	2	1300	1301
1706	Vmax Cellphone And Accessories Shop (Tecno)	WALTERMART CABUYAO KM. 47	300	311	14.232426	121.134901	1	1500	1503
1707	Gaycee Construction Services	BLK 19 LOT 12 PH 2	1000	1012	14.269385	121.159550	2	200	203
1708	Narvaja Property Rental		400	405	14.276891	121.133403	2	200	211
1709	Fastluna Logistics Services	BLK 8 LOT 11	1800	1819	14.242177	121.139303	2	1700	1706
1710	Last Cornerstone Enterprises Corp.	BLK 17 LOT 2	1800	1809	14.235623	121.122282	1	1500	1515
1711	Tjl Metal Fabrication Services	#0044 FREE FARMERS	900	922	14.231554	121.146224	1	1100	1112
1712	F & C Logistics Services	#750	800	811	14.268563	121.154767	2	1700	1706
1713	Rc Landicho Ii Office Equipment Trading	P. BURGOS ST.	1300	1308	14.280478	121.124108	1	1500	1514
1714	Ippuda Beauty Lounge	UNIT 213 COMERCIO CENTRALE	1600	1614	14.241853	121.131508	2	1300	1301
1715	Cml Food Store	BLK 17-D LOT 12	300	306	14.234644	121.137467	3	800	812
1716	Manaf Footwear Store	PRINCE MARKET	300	317	14.230589	121.138338	1	1500	1501
1717	Prince Vincent Snack Corner	BRGY. 3	300	317	14.230646	121.138418	1	1500	1507
1718	Silver Jem Corporation	#7045	1700	1713	14.272058	121.122488	2	1100	1111
1719	M.B. Aguirre Pawnshop (Pulo Branch)	#129	1600	1622	14.273376	121.124936	2	700	709
1720	Maretech Precision Toolings & Industrial Services		1600	1617	14.243816	121.120376	2	1100	1111
1721	Mareto Metal Industries	B17 L34	1600	1601	14.241947	121.128475	1	1100	1112
1722	Emm-Josh General Merchandise	#87	1100	1112	14.263904	121.127151	1	1500	1507
1723	Shineland Store	#69	1100	1112	14.262769	121.126504	1	1500	1513
1724	J.A. Marasigan Builders	BLK10 LOT1	900	926	14.236946	121.152471	2	200	203
1725	M.B.Aguirre Pawnshop -Cabuyao Branch	#23 J.P.RIZAL ST.	1400	1404	14.273253	121.125020	2	700	709
1726	M.B. Aguirre Pawnshop - Mamatid Branch	UNIT 3	300	307	14.230070	121.142463	2	700	709
1727	Greg Egg Store		1400	1402	14.277515	121.123888	1	1500	1507
1728	Marycheck Corporation		300	307	14.232646	121.146627	1	1500	1515
1729	Syvin Trading & General Merchandise	BLK5 LOT21-23	200	209	14.250782	121.127585	3	200	204
1730	F And H Trading	#18	1800	1822	14.235381	121.135226	1	1500	1504
1731	Mamshi`S Sari-Sari Store	#255	900	931	14.235452	121.159030	1	1500	1513
1732	Falcon`S Engineering And Machine Shop	BLK111 LOT25	900	913	14.242207	121.164680	1	1100	1112
1733	Masigasig Development Corporation	L1 B7 CIRCUIT ST.	700	703	14.235004	121.098168	2	200	212
1734	Raquel & Eric Store	#98	200	217	14.252787	121.128769	1	1500	1513
1735	Jadensy Sari-Sari Store	#104	1600	1622	14.249223	121.132312	1	1500	1504
1736	Sta. Clara General Merchandise	BLK5 LOT1	1000	1012	14.269105	121.159529	1	1500	1509
1737	Smj Pawnshop- Banlic Cabuyao Branch		300	313	14.228416	121.139824	2	700	709
1738	Makiling Travel & Tours, Inc.	VH CPD.	200	217	14.254575	121.128451	3	1600	1603
1739	Alegria Dos Rios		1200	1205	14.220676	121.074353	2	200	219
1740	C.E.S. Printxpress Printing Services	#68	200	217	14.254515	121.128482	2	400	404
1741	St. Magdalene Polyclinic		300	308	14.232971	121.135581	2	900	903
1742	Mamatid Festival Mall Transport Cooperative (Mafestco)	MAMATID ROAD	300	313	14.228658	121.140121	2	300	301
1743	St. Claire Anti Rabies Clinic	ST. FRANCIS VI	1100	1103	14.263809	121.127415	2	900	901
1744	Smart Angel Integrated School Of Cabuyao, Inc.	B2LK4 LOT1	1600	1612	14.240582	121.132154	2	500	503
1745	L.A Acers Agrivet Supplies	#229 J.P RIZAL ST.	1300	1302	14.279688	121.122639	1	1500	1515
1746	Anm-Ises Inc.	BLK3 LOT70	200	210	14.256921	121.128917	1	1500	1507
1747	Maxilite Merchandising Inc.		300	308	14.228278	121.139063	2	1700	1713
1748	Mara Holdings, Inc.	WEBFORGE BLDG. MAIN AVE. COR. HOLOGRAM ST.	700	703	14.235212	121.108259	2	700	705
1749	Danie And Malou`S Meat Stall		1400	1402	14.277407	121.124018	1	1500	1504
1750	Mark And Rose Anne Rtw Store		1400	1402	14.277476	121.123939	1	1500	1501
1751	Gf Manipol`S Apartment	#83	900	908	14.234620	121.150064	2	200	201
1752	Maxim De Humana International Inc.	KPI WAREHOUSE BUILDING	700	703	14.239671	121.105705	2	1400	1407
1753	Benz Fuel Station	#393	400	410	14.291488	121.131687	3	100	104
1754	Kjcm Enterprises	#111 OSMEÑA ST.	1500	1505	14.276388	121.126996	1	1500	1516
1755	Mega Alliance Pension Loan Corporation	2ND FLR. AD BLDG. JP RIZAL ST.	1300	1302	14.277980	121.123049	2	700	707
1756	Danie And Malou`S Bulalohan		1700	1720	14.271713	121.123205	3	800	805
1757	Top Square Bakery	#42	1800	1808	14.246960	121.145758	1	1100	1105
1758	Mighty L & K Foods, Inc. ( Arbee`S Bakeshop)		200	217	14.254375	121.128490	1	1500	1504
1759	Rove Chem Trading	BLK14 LOT27 KAPITAN MARIA AVE.	1600	1622	14.247026	121.135997	1	1500	1511
1760	Market Strategic Firm, Inc.	SAVEMORE MARKET	300	308	14.227725	121.138330	2	700	708
1761	Far-M Logistics	BLK230 LOT15 BALINTAWAK ST.	900	913	14.239528	121.162330	2	1700	1710
1762	Maraña Builders	BLK15 LOT24 KALANTAS ST.	1600	1603	14.242877	121.129208	2	200	203
1763	Market Strategic Firm, Inc.	SAVEMORE CABUYAO	1400	1401	14.276765	121.124056	2	700	708
1764	Mapletree Incorporated (Memoxpress)	SAVEMORE MARKET A. BONIFACIO ST.	1400	1401	14.276735	121.124017	1	1500	1507
1765	Christian C. Marasigan Trading	#161	1000	1014	14.275031	121.139271	1	1500	1509
1766	Vvcm Wash Laundry Services	BLK 180 LOT-7A	900	918	14.236787	121.157490	2	1200	1208
1767	Mira Aurea Alisha, Inc.	#25	1700	1720	14.271611	121.123273	1	1500	1510
1768	Cube Industrial Supplies And Services	BLK53 LOT17 PH3	500	508	14.281421	121.135487	1	1500	1509
1769	Metrocare Health Systems, Incorporated	BLK 4 LOT 3 & 4 	200	205	14.253893	121.129358	2	900	910
1770	R. L3W Construction Services	BLK-11A LOT8	800	813	14.259569	121.151190	2	200	221
1771	The Generics Pharmacy	BLK14 L157	1000	1011	14.269454	121.155024	3	900	912
1772	Motorcentral Sales Corporation		1600	1614	14.244971	121.130911	1	1500	1516
1773	Sweet Cravings Food Services	3 AMPERE ST.	700	703	14.235608	121.093381	3	800	802
1774	Jyt Hardware		300	314	14.230976	121.143646	1	1500	1509
1775	Leoj Enterprise	BLK8 LOT34	1000	1012	14.269097	121.159553	2	200	221
1776	Mariano Center For Technical Studies Inc.	#27 	200	203	14.257084	121.126761	2	500	507
1777	Rak`S Bakery	#069	1600	1614	14.246278	121.130194	1	1500	1504
1778	Renato M. Martinez Real Estate Leasing		300	317	14.230654	121.138536	2	200	211
1779	Madz Garment Subcontracting Services	BLK5 LOT5 PH5A	800	816	14.266590	121.158744	3	1100	1106
1780	Sykie`S Sari-Sari Store		1600	1622	14.249258	121.132352	1	1500	1513
1781	M. Lhuillier Pawnshop & Jewelry And Ml Kwarta Padala	CENTENNIAL PLAZA BLDG.	1800	1802	14.238006	121.132763	2	700	709
1782	M. Lhuillier Pawnshop & Jewelry And Ml Kwarta Padala	CENTENNIAL PLAZA BLDG.	1800	1802	14.238051	121.132745	2	700	709
1783	Asmed Pharmacy	BLK35 LOT32 PH1	1000	1012	14.269076	121.159632	3	900	912
1784	Rotana Ladybug Merchandise	CENTROMALL	1600	1614	14.242473	121.131201	1	1500	1501
1785	May Yam Alimagno Inc.	#326 J.P. RIZAL ST.	1700	1708	14.268110	121.126935	2	1700	1709
1786	Southpoint Badminton Court		200	216	14.247165	121.113667	2	600	608
1787	Jritch Funeral Services		1600	1617	14.244271	121.121427	2	1200	1203
1788	Mobilecraze Telecom Inc.	C/O PUREGOLD KIOSK #2	1500	1507	14.275566	121.124367	1	1500	1507
1789	An-Rodz Gym	BLK 15 LOT 17	900	920	14.240160	121.149673	2	1300	1304
1790	M.Lhuillier Pawnshop & Jewelry And Ml Kwarta Padala		900	931	14.229231	121.138117	2	700	709
1791	Angel Care Birthing Home Clinic	BLK 3 LOT 18	1000	1013	14.278086	121.145548	2	900	908
1792	Rovomig General Merchandise	BLK10 LOT54	1000	1012	14.269301	121.159557	1	1500	1509
1793	Middelen Magna Trade, Inc.	GATE 2 GENPACCO COMPOUND	1200	1205	14.221416	121.074903	1	1800	1816
1794	Medillo Construction And Engineering Services	BLK15 LOT17 MARANG ST.	1600	1613	14.247423	121.136228	2	200	203
1795	Afvl Enterprises	BLK41 LOT24 PH1	1000	1012	14.269230	121.159456	3	400	404
1796	Robrejohn Auto And Truck Parts	#5	1100	1112	14.265179	121.127005	1	1500	1516
1797	Mdm Manzanades Enterprise	BLK2 LOT1  PH-2C	500	508	14.281426	121.135532	1	1500	1504
1798	Jom Gas Station	LOT 3	1700	1713	14.270941	121.123416	3	100	104
1799	Mba Holding Company, Inc.	#23 J.P. RIZAL ST.	1400	1404	14.276888	121.123746	2	200	211
1800	Madelo Construction Corporation	BLK1 LOT48	800	802	14.254929	121.163703	2	200	221
1801	R.M. Mendezabal Construction Supplies Trading	BLK 14 LOT 5 PH 2	1000	1001	14.274660	121.150633	1	1500	1509
1802	Aam Animal Feeds Trading	#405	100	104	14.243863	121.170191	1	1500	1515
1803	St. Claire Anti-Rabies Clinic	BLK 11 LOT 13	1700	1720	14.263941	121.127352	2	900	901
1804	Argemlab Resources And Calibration Services.	BLK 10 LOT 18 TIMOTHY STREET	300	302	14.228686	121.136957	2	1400	1407
1805	Diydoityella Printing Services	#047	100	106	14.247309	121.169237	2	400	404
1806	Primadz Document Processing Services	C257 CENTRALE BUILDING	1700	1723	14.271063	121.123717	2	1400	1001
1807	Clara`S Kitchenette	#160	1600	1622	14.245401	121.130374	3	800	805
1808	A & M Maraña Property Rental	#155	200	212	14.250684	121.129024	2	200	201
1809	Alx Action Camera And Helmet Store		300	313	14.229050	121.138239	1	1500	1516
1810	Lime Property Leasing Services	BLK 10 LOT 1	200	210	14.257007	121.133194	2	200	211
1811	Aliesha Beauty And Wellness Products Store	CENTRO MALL PULO	1600	1614	14.242556	121.131212	1	1500	1516
1812	Jzm Transport Services	BLK 7 LOT 23	800	814	14.259393	121.151270	2	1700	1710
1813	Jm2 Enterprises		1800	1810	14.245796	121.143445	2	1100	1104
1814	Anchored Digital Printing Services	BLK 26 LOT 8	900	917	14.244445	121.153739	2	400	404
1815	5Jgas Lpg Trading	#186	1100	1112	14.262643	121.126555	1	1500	1505
1816	Enzoi Sari-Sari Store	BLK 32 LOT 12	200	209	14.250603	121.127762	1	1500	1513
1817	Wible Logistics Services	BLK 129 LOT 36	900	913	14.238613	121.162199	2	1400	1404
1818	My Drug Opc	LOT 1-A	200	213	14.257620	121.139973	3	900	912
1819	Brewing Food And Beverage Kiosk	NOSH ST.	200	216	14.242232	121.113067	3	800	811
1820	3J Sister Salon	#213 COMMONS CENTENNIAL COMMERCIAL BLDG.	1600	1622	14.242074	121.131503	2	1300	1303
1821	Enry And Reza Lpg Trading	BLK 25 LOT 47	100	103	14.242371	121.169450	1	1500	1507
1822	Emcpl Enterprises		400	405	14.275539	121.128896	2	1700	1712
1823	Macdental Dental Center	#13 J.P. RIZAL ST.	1400	1404	14.277049	121.123479	3	900	902
1824	Metaleon General Services Inc.	BLK 16 LOT 12	900	926	14.236949	121.152507	2	200	221
1825	Ljfm Consumer Goods Trading	BLK 15 LOT 1	200	210	14.256032	121.128664	1	1500	1515
1826	G-Spot Beauty Lounge	UNIT 6 DIVIMALL (AT THE BACK)	1600	1622	14.243224	121.134424	2	1300	1301
1827	Madz Transport Services	BLK 17 LOT 6	800	817	14.261769	121.151785	2	1700	1710
1828	3K Melchor Lpg Supply	BLK 14 LOT 6	1600	1604	14.252777	121.138753	1	1500	1505
1829	Matienzo & Mayamaya Hardware & Construction Supplies		600	604	14.189065	121.032483	1	1500	1509
1830	Im Construction Services	#572 NIEVES N BASACA ST.	400	408	14.286405	121.129043	2	200	203
1831	Medpure Pharmaceutical Company Inc.	2ND FLR.-J RLI BLDG. 2	200	216	14.242797	121.113247	3	1800	1811
1832	Jfdm Realty	BLK 10 LOT 27	1600	1603	14.243002	121.129493	2	200	214
1833	Rbtm Fire Extinguisher Trading	BLK 253 LOT 17	900	918	14.239338	121.159589	1	1800	1809
1834	Rm Dental Clinic	#155	200	212	14.252199	121.128788	1	1500	1507
1835	Jvblessed Food Stall	BLK 13 LOT 27	200	216	14.242219	121.113209	3	800	808
1836	Mantafi Tech Opc	BLK 2 LOT 12	200	210	14.255997	121.128859	2	500	506
1837	Lydia Lpg Store		600	601	14.204963	121.039774	1	1500	1505
1838	Labada Ni Nene Laundry Service	BLK 14 LOT 80 PH 5	800	816	14.263308	121.156038	2	1200	1208
1839	Neizel And Ben Bakery	#336	100	106	14.243888	121.170183	1	1500	1513
1840	Mmb Mentality Food Store (Papa Fritoes)	PUROK 1 	300	308	14.232924	121.135503	1	1500	1504
1841	Mbeea Hardware Industrial Supplies Corporation	#245	1600	1614	14.240837	121.132276	1	1500	1509
1842	Grace`Y-Ron Sari-Sari Store	BLK 35 LOT 2	1600	1602	14.244461	121.132916	1	1500	1513
1843	S.W.M.B. Trucking Services	BLK 6 LOT 2	1800	1809	14.235753	121.122405	2	1700	1711
1844	Labada Ni Nene Laundry Service	BLK 19 LOT 1	1600	1602	14.246166	121.137187	2	1200	1208
1845	Mac Marketing Corporation	BLK 3 LOT 3 RLI BLDG. 3	200	216	14.242198	121.113432	3	1800	1807
1846	Mayon Machinery Rentrade, Inc.		1600	1617	14.241239	121.119537	2	200	203
1847	Maidehao Trading, Corp.		200	212	14.252261	121.128790	2	1700	1713
1848	Trims & Tones Salon	RAFA BUSINESS CENTER	1700	1710	14.276741	121.132789	2	1300	1303
1849	Foursis Mini Grocery	#84	1800	1822	14.239266	121.137316	1	1500	1508
1850	Mcg Canlubang Inc. (Mcdonald`S)		1200	1202	14.218968	121.068056	3	800	806
1851	Metimur Enterprises	#164	1600	1622	14.245505	121.130506	3	1100	1112
1852	Northwest Basic Commodities Corp.		1800	1822	14.590781	121.036253	3	1800	1801
1853	Nestle Employees Multi-Purpose Cooperative	#084	1700	1720	14.271743	121.123268	2	300	301
1854	Crystal Ville Construction	BLK4 LOT2	100	101	14.245038	121.169490	2	200	203
1855	Kiddie Star Learning Center Of Cabuyao, Inc.	BLK227 LOT19	900	913	14.237759	121.160104	2	500	502
1856	Nocedo`S Junkshop		100	106	14.246126	121.169576	3	1800	1810
1857	Jope Maternity Clinic	BLK25 LOT36	1800	1803	14.238535	121.135251	2	900	908
1858	Eljin Spring & Industrial Supplies	BLK23 LOT8 PH1	1000	1012	14.268331	121.156463	1	1500	1509
1859	Premier Southern Petroleum Corp.		1700	1713	14.271287	121.122790	3	100	104
1860	Multiweb Enterprises	BLK20 LOT30	1800	1803	14.240379	121.136707	2	1400	1406
1861	Talipapa Ni Nanay Maring	B13	1000	1011	14.275643	121.143742	2	200	211
1862	Agn Optical	CENTRO MALL CABUYAO	1600	1614	14.242649	121.131233	1	1500	1507
1863	God`S Grain Rice Dealer		1400	1402	14.277431	121.123762	1	1500	1504
1864	I Glen Francis Drugstore And Merchandise	HIMPISAO BUSINESS STALL	900	923	14.234788	121.150879	3	900	912
1865	Cdm General Merchandise	J.P. RIZAL ST.	1300	1302	14.276780	121.123716	1	1500	1507
1866	Nidec Precision Philippines Corporation	MAIN AVE. COR. BINARY ST.	700	703	14.234439	121.095805	1	1100	1114
1867	Rickman Precision Trading	155	500	505	14.288470	121.139686	2	1400	1407
1868	Mia`S Gasoline Station		900	923	14.235231	121.156281	3	100	104
1869	Nexperia Philippines, Inc.	PHILIPS AVENUE	700	703	14.230284	121.095838	1	1100	1114
1870	L.J.M Pasao Gasoline Station (Ecooil)	P.BURGOS COR. GEN. LUNA	1300	1303	14.280471	121.124458	3	100	104
1871	L.J.M Pasao Gasoline Station (Ecooil)		1800	1818	14.241867	121.142151	3	100	104
1872	Lola Tinay Catering Service		1700	1702	14.273379	121.129363	3	800	803
1873	New Laguna Steel Center And Construction Supply Corp.	#413	200	212	14.251955	121.128989	1	1500	1509
1874	Pudong Malunggay Pandesal	38	1600	1614	14.247617	121.129623	1	1500	1504
1875	R.A.N. Fuel Station		1000	1007	14.273942	121.152380	3	100	104
1876	Raq`S Fuel Station		100	104	14.242962	121.170551	3	100	104
1877	Jandi Sari Sari Store	BLK 15 LT 29	800	813	14.259670	121.151255	1	1500	1513
1878	Wall Street Courier Services Inc. (Ninja Van)	LOT C & D	1600	1617	14.243236	121.131517	2	1700	1713
1879	Nanotech Analytical Services And Training (Nasat) Corporation	BLK7 LOT2 UNIT 9 GROUND FLOOR GPS BUILDING	200	216	14.243916	121.114003	2	1400	1415
1880	Nbl Pilipinas Corp.	B-6 L-3 HOLOGRAM ST.	700	703	14.234016	121.108250	2	600	608
1881	Rc12 E- Loading Station	BLK. 125 LOT 2	900	913	14.242506	121.163215	1	1500	1503
1882	Liriko Karaoke Bar	CENTROMALL FOOD PARK	1600	1614	14.242620	121.130375	3	800	813
1883	L C M Delivery Services	BLK 22 LOT 31 PH 1	1000	1012	14.269405	121.159475	2	1700	1703
1884	Sebastian`S Wet And Dry Market	#264	1600	1622	14.249266	121.132370	2	200	211
1885	Casa`De`Roma Resort	#513	900	923	14.236102	121.163096	2	1600	1602
1886	Cmcs Lpg Outlet	BLK 22 LOT 5	900	920	14.238606	121.151125	1	1500	1505
1887	Jerl Lpg Trading	#1170	1100	1112	14.261320	121.128886	1	1500	1505
1888	3` Anak Meat Shop	SEBASTIAN WET & DRY MARKET	1600	1614	14.248762	121.129358	1	1500	1504
1889	Rio`S Noodle House (Noodle House)	REYSAL BLDG. EL SOL PLAZA	1400	1403	14.277100	121.123403	3	800	808
1890	Vaporgram 2 Vape Shop	#207	300	308	14.229277	121.138082	1	1500	1515
1891	Vaporgram 2 Vape Shop		200	212	14.255400	121.128500	1	1500	1515
1892	Our Lady Of Assumption College Inc.	B220 L1-29	900	913	14.239950	121.148743	2	500	503
1893	One Algon Place Foundation, Inc.	#858	900	931	14.237328	121.163833	2	1400	1411
1894	Lakeside Nest Water Filtration And Refilling Station	BLK2 LOT14 PH 3 	200	211	14.263653	121.145053	1	1500	1517
1895	Cero 168 Commercial Space Rentals	#204	1600	1619	14.245608	121.130006	2	200	211
1896	Onlinecrib Co.	UNIT 6 CANTILLANO BLDG.	300	317	14.230700	121.138012	2	1400	1407
1897	Evelyn V. Ostia Meatshop	B41 L153	1100	1110	14.271686	121.143479	1	1500	1504
1898	R.J.O. Transport Services	#184	1700	1723	14.266482	121.117978	2	1700	1710
1899	One Green Arrow Manpower Corp.	#61	400	414	14.282561	121.126645	2	1400	1407
1900	Joyful Commercial Space Leasing	BLK5 LOT23	1700	1720	14.271759	121.123274	2	200	211
1901	O&G Pca Industry System Enterprise Corp.	UNIT 202 THE CENTRALE BLDG.  COMMERCIAL CENTER	200	216	14.242067	121.112523	3	1800	1816
1902	Daone Tarpaulin Printing	BLK180 LOT9D	900	918	14.237608	121.157755	2	400	401
1903	Corner Store	BLK 2 LOT 11 PH 2	200	211	14.263828	121.143942	1	1500	1507
1904	Cjo Industrial And Construction Enterprises	BLK 5 LT 38	1800	1803	14.240335	121.136337	1	1500	1509
1905	Jaxel Ink Refilling Station	58	900	931	14.233422	121.148475	2	400	404
1906	Olympus Games And Amusement Corp.	SAN BMI BLDG.	300	317	14.230284	121.137370	2	600	602
1907	Olympus Games And Amusement Corp.	CENTENNIAL PLAZA	1800	1802	14.238035	121.132737	2	600	602
1908	Stena Hardware	BLK21 LOT2	900	916	14.243300	121.155028	1	1500	1509
1909	Rich-Nel Industrial Supply	BLK21 LOT9	200	204	14.253020	121.131661	2	200	221
1910	Onde-Go Delivery Services	BLK 1 LOT 11 PH 2 	1600	1601	14.241725	121.128071	2	1700	1703
1911	Olive Maintenance Services, Inc.	MJSJ BUILDING	200	210	14.258256	121.132471	2	1400	1407
1912	One Source General Solutions Inc.	LOT 3047	1700	1723	14.266736	121.118062	2	1400	1407
1913	One Network Hubs Inc.	UNIT 5 ANNIJO LAND DEVELOPMENT & LEASING CORPORATION	1700	1713	14.271263	121.123053	2	200	211
1914	Flock Lpg Trading (Brent Gas And Superkalan Gaz)	#125	200	212	14.254083	121.128434	1	1500	1505
1915	Andrei`S Coffee Shop		600	603	14.204963	121.039774	3	800	804
1916	Rj-B Construction Services	BLK 5 LOT 4	1100	1111	14.263823	121.127484	2	200	203
1917	One Ehs Training, Consultancy & General Services Co.	BLK 1 LOT 45 MAKISIG ST.	200	210	14.256065	121.128718	2	1400	1406
1918	Aldrin`S Sari-Sari Store	BLK 4 LOT 176	1000	1011	14.271606	121.143571	1	1500	1513
1919	Rhen`S Sari-Sari Store	BLK 30 LOT 1	1600	1602	14.245559	121.137418	1	1500	1513
1920	Washables Laundry Shop	BLK 30 LOT 1	1600	1602	14.244378	121.132894	2	1200	1208
1921	Baskets And Cups Bakeshop	#234	300	307	14.228176	121.139268	1	1100	1105
1922	Barqueros Native Product		1400	1402	14.277289	121.123618	1	1500	1507
1923	Wbp Hardware	#250 J.P. RIZAL ST.	1300	1302	14.277971	121.123052	1	1500	1509
1924	Trico Merchandise	BLK18 LOT41	1000	1011	14.271593	121.143515	1	1500	1507
1925	Casa Bella Property Rentals	#74 LIMCAOCO ST.	1300	1304	14.278438	121.123653	2	200	214
1926	Pempeyo International Foods, Inc.		200	205	14.253687	121.128688	1	1100	1105
1927	St. Aloysius Gonzaga De Castiglione School Inc.	BLK16 LOT10	1800	1809	14.234954	121.123210	2	500	503
1928	Merjames Purified Water Refill Station	BLK20 LOT17 PH1	1000	1012	14.270675	121.153856	1	1500	1517
1929	Cabuyao Performance Cycle Shop		200	212	14.255575	121.128433	1	1500	1516
1930	Romivic Marketing	LPB 2ND FLR. SERAFIN BLDG. LPB 3	300	308	14.228271	121.138797	1	1500	1510
1931	Pamantasan Ng Cabuyao Multi-Purpose Cooperative ( Pnc - Mpc )		200	210	14.259517	121.133837	2	300	301
1932	Alcarez Property Rental	#053 MALVAR ST.	1300	1306	14.277753	121.123633	2	200	211
1933	Pagasa Philippines Finance Corporation	B17 L3 IVORY ST.	1700	1722	14.271947	121.125775	2	700	707
1934	Zarj Builders & Engineers` Services	BLK 8 LOT 26 MAHINHIN ST.	200	210	14.257440	121.131463	2	200	202
1935	Ken & Kait Print House & General Merchandise	6640	900	922	14.233109	121.147721	2	400	404
1936	Precious Treasures Christian School Of Cabuyao Inc. ( Banaybanay )	BLK7 LOT24-25	200	207	14.249841	121.128713	2	500	503
1937	Precious Treasures Christian School Of Cabuyao Inc. ( San Isidro )	B-2 C-3 & C-4	1800	1816	14.235322	121.141665	2	500	503
1938	Aqua Celay Water Refilling Station	BLK42 LOT1	1100	1110	14.267288	121.143736	1	1500	1517
1939	Pagoda International, Inc.	CANLUBANG IND. ESTATE	1200	1205	14.228006	121.085709	1	1100	1113
1940	Yottabytes Systems	B130 L34 P2 MCS	900	913	14.239300	121.159271	2	1000	1003
1941	Mzp Junkshop	LAKESIDENEST	200	213	14.257644	121.140172	3	1800	1810
1942	Blessedwomb Lying-In And Maternity Clinic	BLK19 LOT17 & 18 PH 2	200	211	14.263413	121.142936	2	900	908
1943	Kim Edsel Mini Store	BLK211 LOT29	900	913	14.238679	121.162235	1	1500	1513
1944	Jap Landmark Building		1500	1503	14.275502	121.124126	2	200	211
1945	Solafide Industrial Automation And Control System	BLK 2 LOT 20	200	210	14.256014	121.128742	2	1000	221
1946	Pj Friendship Corporation	444 H. COMPOUND	200	217	14.254293	121.128501	1	1500	1516
1947	Mct Manpower Services	 MAMATID ROAD	300	313	14.229903	121.141994	2	1400	1407
1948	Pantum Technology Phils., Corp.	BLK28 LOT31 PH1	1800	1816	14.238533	121.139993	1	1500	1509
1949	Philippine Savings Bank	2/F PUREGOLD EXTRA	900	931	14.236438	121.157856	2	700	701
1950	Picture City International, Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232397	121.134729	3	400	403
1951	Proactive Sports Outlet Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232509	121.135040	1	1500	1507
1952	Philippine Savings Bank	WALTERMART CABUYAO KM. 47	300	311	14.232488	121.135132	2	700	701
1953	Grand Supreme Trading	BLK2 LOT4 RAYMUND AVE.	1600	1613	14.247413	121.128098	1	1500	1509
1954	P6 Integrated Pest Management Corp.	#308	1100	1112	14.263417	121.127507	2	1200	1209
1955	D Changing Styles Salon And Spa	WALTERMART CABUYAO KM. 47	300	311	14.232530	121.135201	2	1300	1303
1956	Psi Tech Log Inc.	B6 L3 HOLOGRAM ST.	700	703	14.233891	121.108313	2	1700	1713
1957	M. Palmero Trading	BLK1 LOT69	200	210	14.256085	121.128678	1	1500	1509
1958	Aikaira Battery Center		900	922	14.233782	121.148476	2	100	106
1959	Meter Industrial Supply	#0248	300	314	14.231046	121.143669	1	1500	1509
1960	Palawan Pawnshop And Palawan Express Pera Padala	#243	300	308	14.228032	121.139114	2	700	709
1961	Palawan Pawnshop And Palawan Express Pera Padala	#11 P. BURGOS ST.	1300	1308	14.280143	121.123156	2	700	709
1962	Pinagkaisa At Nagkakaisang Manggagawa Ng R. Hortaleza Multi-Purpose  Cooperative	#411 EL SOL PLAZA	1400	1403	14.277040	121.123430	2	300	301
1963	Eleuterio G. Pulido Enterprises		800	810	14.254634	121.167176	2	1700	1703
1964	Psi Packaging And Integrated Logistics Services, Inc.	B6 L3 HOLOGRAM	700	703	14.233870	121.108248	2	1400	1402
1965	Power Serve Group Holding, Inc.	B6 L3 HOLOGRAM ST.	700	703	14.233847	121.108429	2	700	705
1966	Premier Southern Petroleum Corp.		1600	1617	14.242505	121.116385	3	100	104
1967	Allan And Beth Store	BLK79 LOT43	100	102	14.242891	121.166827	1	1500	1513
1968	Cirio G. Perez Lot Leasing		1000	1007	14.275041	121.139440	2	200	211
1969	Zero One Merchandising Center		1700	1713	14.271875	121.122698	1	1500	1509
1970	Hanadulset General Merchandise	UNIT #1 2ND FLOOR E.G.A. BUILDING LIMCAOCO ST.	1500	1507	14.275210	121.125826	1	1500	1507
1971	Palawan Pawnshop And Palawan Express Pera Padala	YETANA COMMERCIAL CENTER CORNER	200	210	14.255901	121.128779	2	700	709
1972	Shine Hong Enterprises	(Parian)	800	805	14.260082	121.153871	1	1500	1515
1973	L2R Enterprises	#22	100	104	14.247320	121.169231	1	1500	1507
1974	Cb Prado Engineering Services	DNS BUSINESS COMPOUND	1600	1617	14.242661	121.116395	2	1400	1407
1975	Pinoy-Homes / Sapphire-Dreamhomes Realty Services	BLK 1 LOT 73	1600	1601	14.242337	121.129425	2	200	219
1976	Amor Rice Store	BLK79 LOT35	100	103	14.242339	121.168535	1	1500	1504
1977	Palawan Pawnshop And Palawan Express Pera Padala		1600	1614	14.247702	121.129788	2	700	709
1978	Palawan Pawnshop And Palawan Express Pera Padala	13 BAYANWALK J.P. RIZAL ST.	1400	1404	14.276774	121.123380	2	700	709
1979	Premier Southern Petroleum Corp.		900	922	14.233114	121.147673	3	100	104
1980	Phase Ii Holdings Corporation	#25 BINARY ST.	700	703	14.229650	121.097047	2	700	705
1981	Pmi Holdings Inc.	# 5 CIRCUIT 7 ST.	700	703	14.236088	121.098038	2	200	211
1982	Probus Business Consulting, Inc.	#149	200	212	14.252010	121.128931	2	1400	1406
1983	Cjca Transport Services	BLK 25 LOT 10	900	919	14.240914	121.150954	2	1700	1710
1984	Lara And Rhaine`S Transport Services	PH 1 BLK 16 LT 5	1000	1001	14.274627	121.150522	2	1700	1709
1985	Viewfinder Travel And Tours	BLK10 LOT16 MANGOSTEEN ST.	1600	1621	14.249288	121.131932	2	1600	1603
1986	Elnatan Enterprise	UNIT 2 2/F KAMPANANG GINTO BLDG.	1700	1723	14.271818	121.123602	1	1500	1515
1987	Charlotte & Trishia Trading		400	410	14.291868	121.131322	1	1500	1505
1988	Apar-Tech It Solution & Consultancy Services	BLK20 LOT13	800	813	14.259577	121.151308	2	1400	1407
1989	Petrozone Marketing, Corp.	#10	300	317	14.230891	121.138122	1	1500	1505
1990	Palawan Pawnshop And Palawan Express Pera Padala	UNIT 101 GROUND FLR. VITA EAGLES COMMERCIAL BUILDING	1600	1614	14.256764	121.128605	2	700	709
1991	Phil-Euro Home Gallery Inc.	LETICIA LIM SUBDIVISION	900	922	14.235940	121.151669	3	1800	1816
1992	Pinagpala San Isidro Homeowners Association, Inc.	#237	900	922	14.235187	121.157625	2	1400	1411
1993	P.A. Properties Hankyu Hanshin 4 Inc.		1000	1014	14.275216	121.139337	2	200	218
1994	Pepsi-Cola Products Philippines, Inc.	3 FUSION ST.	700	703	14.237413	121.103764	2	1700	1713
1995	Personal Collection Direct Selling, Inc.	J.P. RIZAL ST. CORNER BONIFACIO ST.	1400	1404	14.276872	121.123804	3	1800	1812
1996	Shine Hong Enterprises	#9894	1100	1104	14.262774	121.126435	3	1800	1810
1997	Comara Food And Beverage Store	BLK 11 LOT 3	200	210	14.255976	121.128815	3	800	809
1998	Netas Food And Beverage Stall	DIVIMALL PULO	1600	1614	14.242943	121.131631	3	800	808
2213	Vvt Junkshop	#082	300	311	14.232132	121.135841	3	1800	1810
1999	Netas Food And Beverage Stall	DIVIMALL PULO	1600	1614	14.242892	121.131599	3	800	811
2000	Saranghae Store	BLK 21 LOT 1	1600	1602	14.245288	121.137399	1	1500	1513
2001	Petrozone Marketing Corp.	BLK 1 LOT 6	1000	1013	14.277810	121.145333	1	1500	1505
2002	Perez Water Station	BLK 21 LOT 8	900	920	14.238435	121.152424	1	1500	1517
2003	Pgp Travel & Tour Ph Opc	BLK 45 LOT 6	1600	1602	14.244451	121.133012	2	1600	1603
2004	Excella`S Laboratory Supplies	BLK 6 LOT 3 PH 2-B	500	508	14.281471	121.135662	1	1500	1515
2005	Pdec Co.	#69 HEMEDEZ COMPOUND	1100	1102	14.263518	121.126692	2	1100	1110
2006	Iexplore Travel & Tours	BLK 5A LOT 8	800	815	14.261500	121.148168	2	1600	1603
2007	Puregold Price Club, Inc.	DIVIMALL PULO	1600	1614	14.243104	121.131661	3	1500	1508
2008	Philippine Seven Corporation		400	410	14.291933	121.131236	1	1500	1502
2009	Martin Lpg Trading	BLK 23 LOT 26	1000	1011	14.271658	121.143410	1	1500	1505
2010	Gst Trucking Services	BLK 1 LOT 11 ATIS ST.	1600	1613	14.247000	121.130110	2	1700	1711
2011	Ph Global Jet Express Inc.	#724	1700	1702	14.273502	121.129162	2	1700	1713
2012	Puregold Price Club, Inc.	DIVIMART BANLIC	300	314	14.230507	121.143527	3	1500	1508
2013	Ps Lpg Store	72	1100	1103	14.262657	121.127437	1	1500	1505
2014	Premier 101 Healthcare Management Inc.	2ND FLR. CABUYAO CITY HOSPITAL	1800	1822	14.244233	121.139484	2	900	904
2015	Villa De Oro Marketing	BLK 3 LOT 11 PH 3	1600	1607	14.250058	121.139276	1	1500	1505
2016	Prime Eastern Spring Holdings Inc.		1200	1205	14.221525	121.075011	2	200	215
2017	Musang Trucking Services	BLK 19 LOT 25 PH 1	1000	1001	14.273999	121.149753	2	1700	1711
2018	Eight Mile Emission Testing Center		300	314	14.230553	121.143627	2	100	106
2019	Rol-An Fish Retailing	#51	1800	1822	14.246940	121.145752	1	1500	1504
2020	C. J. Palomar Food Stall (Famous Belgian Waffles)	WALTERMART CABUYAO KM. 47	300	311	14.232413	121.135207	3	800	808
2021	Philippine Seven Corporation		800	808	14.259989	121.165090	1	1500	1502
2022	Beerbros. Restobar		1600	1614	14.243136	121.131541	3	800	813
2023	K`K Motorcycle Parts Shop		600	603	14.204963	121.039774	1	1500	1516
2024	L-Qbe Food Hub (Jc Siomai King)	BLK 13 LOT 27	200	216	14.242245	121.113549	1	1500	1504
2025	Evelyn`S Sari-Sari Store	BLK 44 LOT 172 PH 9	1100	1110	14.271613	121.143563	1	1500	1513
2026	Pinkwork Advanced Aesthetics Co. (Pinkwork Aesthetics)	BLK 3 LOT 2 PH 1	200	216	14.242090	121.112997	2	1300	1301
2027	Kuninay Carinderia	BLK 207 LOT 41	900	913	14.238773	121.162079	3	800	802
2028	J.C.P. Junk Shop		800	801	14.260208	121.153657	3	1800	1810
2029	Aquaplus Jpp Water Refilling Station	BLK 29 LOT 1	100	103	14.242358	121.169341	1	1500	1517
2030	Kuya Rey Sari-Sari Store	BLK 14 LOT 7	1600	1620	14.245253	121.119070	1	1500	1513
2031	Philippine Seven Corporation ( 7 - Eleven )	BLK 22 LOT 1	800	817	14.261748	121.151885	1	1500	1502
2032	Mpf Airconditioning System Service	BLK 26 LOT 9 PH 2 MAIN	500	508	14.281443	121.135614	2	1200	1201
2033	Cebuana Lhuillier Pawnshop - Cabuyao-Pulo Branch	#3787	1600	1622	14.249260	121.132474	2	700	709
2034	Nancy`S Sari-Sari Store	BLK 14 LOT 82	1000	1011	14.271748	121.143674	1	1500	1513
2035	Pharm Gen Ventures Corp. (Generika Drugstore)	#6 HOLOGRAM ST.	700	703	14.234034	121.108289	3	900	912
2036	Cela Trading	BLK10 LOT16	500	507	14.289134	121.135607	1	1500	1507
2037	Roj Pharmacy	JP RIZAL ST.	1400	1404	14.277269	121.123112	3	900	912
2038	Julie And Raks Food	IONICS CIRCUIT BLDG.	700	703	14.235265	121.110583	3	800	802
2039	Qlink Movers Inc.		200	205	14.253913	121.129471	2	1700	1711
2040	Hoopstepz  Footwear Shop	123	300	308	14.228660	121.138695	1	1500	1501
2041	Qstitch Inc.	WAREHOUSE 3 	200	206	14.254613	121.130085	1	1100	1106
2042	Rural Bank Of San Antonio	#147	1700	1723	14.268159	121.127018	2	700	702
2043	Rizal Commercial Banking Corporation	J.P. RIZAL ST. CORNER DEL PILAR ST.	1400	1404	14.276344	121.124060	2	700	702
2044	Laguna Prestige Banking Corporation	#233 J.P. RIZAL ST. COR. LIMCAOCO ST.	1300	1302	14.278393	121.123168	2	700	702
2045	Raquel Pawnshop Incorporated Cabuyao Branch	122 BONIFACIO ST.	1400	1401	14.276723	121.123639	2	700	709
2046	Jca Buena Suerte General Merchandise	PILMART MARKET	300	313	14.228650	121.139347	1	1500	1507
2047	Laguna Prestige Banking Corporation- Banlic Branch		300	308	14.228666	121.138675	2	700	702
2048	G N F G  Coco Lumber	#63	300	311	14.231556	121.136890	1	1500	1509
2049	Cristal Bakeshop		1400	1402	14.277505	121.123923	1	1100	1105
2050	Mix-Up Breadhaus & Variety Store	J.P. RIZAL ST.	1300	1302	14.278276	121.124759	1	1500	1507
2051	Reiiel Junkshop		400	411	14.292646	121.130595	3	1800	1810
2052	D.C. Rimando Enterprises		400	405	14.276152	121.129355	1	1500	1507
2053	Royal Cablevision Corp.		1700	1720	14.272280	121.125457	2	700	710
2054	Jenrick Sari-Sari Store	BLK1 LOT20 PH2	200	211	14.264861	121.143880	1	1500	1513
2055	Raquel Pawnshop, Inc. (Banlic Br.)		300	308	14.227807	121.139148	2	700	709
2056	Freshly Pure Purified Drinking Water	#68	200	217	14.254178	121.128526	1	1500	1517
2057	Mabuhay Habagat Bakery	BLK 23 LOT 7	900	920	14.237830	121.169486	1	1500	1504
2058	Raquel Pawnshop, Inc. ( Brgy. Dos )	J.P. RIZAL ST.	1400	1404	14.276727	121.123623	2	700	709
2059	Rojjula-4M Development Corporation		1700	1720	14.272502	121.124734	2	200	211
2060	Nikann Enterprises And General Services, Inc.	#186	200	212	14.254066	121.128481	2	1100	1108
2061	A.C.A.R. Brake And Clutch Trading And Services	#15	300	317	14.230841	121.137847	1	1500	1516
2062	D. Ramos Water Proofing Services And Supply	BLK25 LOT33	1800	1803	14.240405	121.136799	2	200	203
2063	Autoden Automotive Center		1700	1710	14.276283	121.129338	3	100	101
2064	Irgie Water Station	BLK8 LOT20 BRONZE ST.	200	204	14.253119	121.131631	1	1500	1517
2065	Farm Grains Poultry Supply	#0841	900	924	14.235700	121.157685	1	1500	1515
2066	Rezel C.Ramos Bakery	BLK-6A LOT1	900	914	14.242984	121.151094	1	1500	1504
2067	Jesbryiel Bakery	BLK28 LOT10	900	921	14.242855	121.155799	1	1500	1504
2068	Rainier Covey Beverages Trading	BLK22 LOT6 PH2	500	508	14.281507	121.135744	1	1500	1504
2069	Melinor R. Rivera Bakery	#258	900	923	14.234954	121.154660	1	1500	1504
2071	Robinson`S Handyman, Inc.	GROUND FLOOR CENTRO MALL	1600	1614	14.242193	121.131041	1	1500	1507
2072	Inquisitive Minds Learning Center	UNIT 211 SALA COMMERCIAL BLDG.	1700	1723	14.273795	121.119851	2	500	506
2073	Robinsons Appliances Corp.	UNIT 113 - 116 G/F CENTRO MALL	1600	1614	14.242152	121.130889	1	1500	1511
2074	Royal Star Appliance Marketing, Inc.		300	313	14.228821	121.138415	1	1500	1511
2075	Aj Ramos Trading	BLK22 LOT57	200	210	14.261846	121.132937	1	1800	1814
2076	Redlocks Cake And Pastries	J.P RIZAL ST.	1300	1302	14.277817	121.123328	1	1500	1504
2077	Ampleon Philippines, Inc.	BINARY ST.	700	703	14.231670	121.095841	1	1100	1114
2078	Nichole Anne Grocery	BLK1 LOT2 PH-1A	500	508	14.281519	121.135792	1	1500	1508
2079	Ypr Prime Enterprises	#9178B TRUCKLANE CORP.	200	216	14.242117	121.113095	1	1500	1514
2080	Noel & Cristy Meatshop	BLK206 LOT21	900	913	14.241780	121.163066	1	1500	1504
2081	Fixfone Pc Trading	BLK220 LOT35	900	913	14.240477	121.160989	2	1000	1007
2082	Roh Auto Products Phils., Inc.	#149	200	212	14.251950	121.128911	2	200	211
2083	Jaurigue Lot Leasing		300	317	14.230939	121.138128	2	200	212
2084	Pella Bike Shop	BLK 7 LOT 5	1600	1611	14.240711	121.132133	1	1500	1516
2085	Cassylicious Food House	BLK 130 LOT 38	900	913	14.239358	121.159467	3	800	805
2086	Rephil Edsa Pasay Inc.		1700	1713	14.270425	121.123585	3	100	104
2087	Unifit Fashion Boutique	UNIT 108-109 GROUND FLOOR CENTROMALL	1600	1614	14.242618	121.131201	1	1500	1501
2088	Noel & Cristy Meatshop	BLK 25 LOT 3	100	103	14.241896	121.163107	1	1500	1504
2089	Rotecc Movers Inc.		1600	1617	14.245630	121.123277	2	1700	1712
2090	Laguna Lrci - Luzon Ram Cycles, Inc.	#185	1600	1622	14.249214	121.132546	1	100	105
2091	Reynaldo Financing Services Corporation	BLK39 LOT7	200	209	14.250811	121.127633	2	700	707
2092	Lucci Rose Enterprise	#193	1600	1614	14.248703	121.129370	2	1100	1104
2093	Jrz Moverz	BLK38 LOT35 PH1	1000	1012	14.269127	121.159491	2	1700	1710
2094	Royal Cablevision Corporation	CENTRO MALL	1600	1614	14.242535	121.131201	2	700	710
2095	Rearden Industries International Corporation	SJB DEVELOPMENT CORP.	1800	1807	14.239231	121.132965	3	1800	1806
2096	Carlos Barber Shop		1400	1403	14.277118	121.123388	2	1300	1302
2097	Ar Ruiz Industrial Equipment Trading	BLK 8 LOT 33 PH 2	1600	1604	14.253427	121.139730	1	1500	1509
2098	`Quick` Advertising Services	BLK 60 LOT 184	1100	1110	14.265859	121.139690	2	400	401
2099	M-R Plumbing Services	BLK 02 LOT 3 PH 3-A	1000	1012	14.269333	121.159561	2	1200	1210
2100	Benjie Grace Bakery	#173	1100	1103	14.262793	121.127495	1	1500	1504
2101	Markmae Eatery	HAVI LOGISTICS PHILS	1200	1203	14.227532	121.085308	3	800	802
2102	Jlp Food Store	#155	200	217	14.253352	121.128690	3	800	812
2103	3R Logistics Services	BLK 60 LOT 35	100	106	14.242181	121.169523	2	1700	1706
2104	Rmm Plumbing Services	BLK 24 LOT 20	200	217	14.253298	121.128704	2	1200	1210
2105	3Km Laundry Services	5365 UNIT 3 CEDRO BLDG.	300	317	14.229624	121.142084	2	1200	1208
2106	Jjn Grill House (Marinduqueño`S Litson Manok)	BLK 19 LOT 4 PH 2	1000	1014	14.275195	121.139643	1	1500	1504
2107	Rima`S Food Hub	NATIONAL HIGHWAY	1600	1614	14.250251	121.129055	3	800	812
2108	Robinson`S Supermarket Corporation (Robinsons Easymart)		1500	1507	14.274793	121.124470	1	1500	1508
2109	Acr Foods Opc (Jc Noodle House)		300	317	14.232697	121.134626	1	1500	1504
2110	`Ellie` Lpg Store		300	317	14.230753	121.137061	1	1500	1505
2111	3K1C Lpg Store		1600	1622	14.242822	121.129515	1	1500	1505
2112	Jjn Grill House (Marinduqueño`S Litson Manok)		1000	1014	14.275099	121.139678	1	1500	1504
2113	Happie`Callie Gift Shop		900	931	14.242898	121.165214	1	1500	1507
2114	Bemy Laundry		200	217	14.256598	121.131653	2	1200	1208
2115	C-Force Outsourcing		200	217	14.250715	121.127741	2	1400	1402
2116	Rayat Transport Corporation		900	931	14.232657	121.146723	2	1700	1710
2117	Readyman, Inc.		1600	1608	14.243047	121.131549	2	1400	1407
2118	Rtj Documentation And Management Support Services Inc.		1700	1723	14.272155	121.125601	2	1400	1406
2119	Edressa Sari-Sari Store		1000	1014	14.275145	121.139369	1	1500	1513
2120	Science Park Of The Philippines, Inc.		700	703	14.237199	121.102083	2	200	212
2121	Cig2 Industrial Gas Trading		1700	1723	14.268593	121.126323	1	1800	1808
2122	Joey And Julie Trading		1700	1723	14.272387	121.125497	1	1500	1509
2123	S.B. Oliveros Pawnshop, Inc.		1600	1622	14.249100	121.132605	2	700	709
2124	Bensil Commercial Building	#216	300	317	14.230733	121.138486	2	200	211
2125	Ed Sale`S Carinderia	BLK 24 LOT 1	100	106	14.242300	121.168599	1	1500	1513
2126	St.Vincent College Of Cabuyao, Inc.	#54	900	931	14.232924	121.148557	2	500	503
2127	Saint Isidore Academy Of Laguna, Inc.	BLK56 LOT190-232	900	920	14.239546	121.146821	2	500	503
2128	St. Jerome Integrated School Of Cabuyao, Inc.	#47	900	931	14.233124	121.147508	2	500	503
2129	Square D Tech.& Devt. Corp.	UNIT 2-A LOT-2 PLANBANK BUILDING	1600	1614	14.248604	121.129395	2	1000	221
2130	Lamcres Commercial Building	#216	300	317	14.230963	121.138687	2	200	211
2131	Twis Catering Services		1700	1703	14.275254	121.132522	3	800	803
2132	Rodel Señerez Funeral Services	#0078	300	317	14.230788	121.138627	2	1200	1203
2133	Stoneridge Ville Homeowners Association, Inc.		400	414	14.283122	121.126714	2	1400	1411
2134	Lan Lyn Lpg Center	BLK 7 LOT 22	1800	1811	14.236698	121.123207	1	1500	1505
2135	Angelo`S Party Needs		1400	1403	14.277074	121.123378	2	600	605
2136	Sipag Pinoy Multipurpose Cooperative	BLK9 LOT4 PH1	1000	1014	14.274498	121.150509	2	300	301
2137	Sumiden Employees` Multi-Purpose Cooperative (Sumeco)	FIRST SUMIDEN CIRCUITS INC. AMPERE ST. COR. MAIN AVE.	700	703	14.233228	121.094088	2	300	301
2138	Reinsan Manpower And Trucking Solutions Co.	#212	800	818	14.258070	121.166010	2	1700	1711
2139	Herwin And Julie Junk Shop		1600	1622	14.266390	121.127070	3	1800	1810
2140	Afresh Time Food Services	BLK 3 LOT 3 AMPERE ST.	700	703	14.234461	121.093376	3	800	802
2141	Southpark Chicken Foodhaus Corporation (Andok`S)	#84	1600	1614	14.248507	121.129422	1	1500	1504
2143	Southpark Chicken Foodhaus Corporation (Andok`S)	#258	900	931	14.235125	121.157731	1	1500	1504
2144	Mardy`S Digital Works	#7 P. BURGOS ST.	1300	1308	14.280005	121.122978	2	400	404
2145	South Star Drug, Inc.	CENTRO MALL	1600	1614	14.246232	121.130491	3	900	912
2146	Eagle Delta Fuel Station	CENTRO MALL	1700	1723	14.276513	121.131540	3	100	104
2147	Tere Junk Shop		1600	1615	14.241886	121.142304	3	1800	1810
2148	East West Banking Corporation	#026 J.P. RIZAL	1500	1503	14.277093	121.123615	2	700	702
2149	Nps Agri Trading	B2 L5	900	931	14.242893	121.155797	1	1500	1507
2150	Suri Waste Management & Disposal Services, Inc.		1100	1112	14.262731	121.126376	2	1700	1705
2151	Treatley Hardware And Construction Supply		1700	1723	14.266896	121.126737	1	1500	1509
2152	Kvs Corinthians Realty	BLK4 LOT1 PH1	1600	1622	14.241966	121.128449	2	200	219
2153	Inno-Source Trading	#149	1700	1723	14.268078	121.127081	1	1500	1503
2154	Southpoint Subd. Homeowners Association Inc.		200	217	14.253119	121.128703	2	1400	1411
2155	Speed-Tech Pest Management	B58 L2	1600	1622	14.248956	121.132558	2	1200	1209
2156	South Pearl Educational Center, Inc.	BLK5C LOT1	800	818	14.262114	121.151977	2	500	503
2157	Sigua Medical Clinic	BLK 3 LOT 50 PH 1 	200	217	14.247056	121.136683	2	900	903
2158	Aranchet Trading	(SOUTH EMERALD)	300	317	14.228707	121.139819	1	1500	1504
2159	Shineway Holdings, Inc.	SHINEWAY HOLDINGS INC. B3 L2 AMPERE ST.	700	703	14.234582	121.093356	2	700	705
2160	Silva Clothings		300	317	14.230496	121.138473	1	1100	1106
2161	Sabati Industrial Sales Corp.	#146	1100	1112	14.262608	121.126645	1	1800	1812
2162	Greg Lapida Making		1500	1507	14.275192	121.125811	3	1100	1116
2163	Rodel Señerez Funeral Services		1600	1622	14.248871	121.132406	2	1200	1203
2164	Sbh Virgo Corporation	SBH COMPOUND	1100	1109	14.262874	121.134743	1	1100	1113
2165	Birthcare Maternity Clinic	BLK 15 LOT 8 PH 2	200	217	14.264625	121.142719	2	900	908
2166	Hampaslupa Collection`S Sportswear Shop	ELSOL PLAZA	1500	1502	14.276720	121.122492	1	1500	1501
2167	Scottland Food Group Corporation (Bonchon Chicken)	UNIT 122 CENTRO MALL CABUYAO	1600	1614	14.242514	121.131201	3	800	812
2168	Vehnee`S Resort		1700	1723	14.270637	121.130437	2	1600	1602
2169	Piics Apartment	VILLAMIN SUBD. 	900	931	14.237283	121.151067	2	200	201
2170	Susalum Corporation	PANORAMA COMPOUND HOLOGRAM ST.	700	703	14.235196	121.108301	3	1100	1107
2171	Yuan Bao Shui Jiao Dumpling Food House	UNIT 206 A PREMIER LEASING CORP. BLDG.	1700	1723	14.266643	121.117999	3	800	812
2172	D` Top Logistics	DUPONT COMPOUND	1600	1622	14.246768	121.131751	2	1700	1711
2173	Jd Silang Construction	BLK 1 LOT 1	200	217	14.253005	121.128715	2	200	203
2174	Pevs Food Cart  ( Mister Donut )	DIVIMALL PULO	1600	1614	14.242881	121.131620	3	800	808
2175	Lets Mobile Phones And Accessories Store	DIVIMALL PULO	1600	1614	14.242887	121.131563	1	1500	1503
2176	Zaa Construction Supplies Trading	BLK 5 LOT 21	800	818	14.260100	121.153797	1	1500	1509
2177	Rejanel Gas Retailing	BLK 6-A LOT 18	900	931	14.243001	121.151519	1	1500	1505
2178	Siegen Center For Excellence And Character Development Inc.	BLK 17 LOT 13	300	317	14.230538	121.138674	2	500	505
2179	Spi Ventures Corporation	#0169	200	217	14.251701	121.128694	1	1500	1503
2180	Spx Philippines Inc.		1700	1723	14.266624	121.118106	2	1700	1713
2181	Summit Merchandising Inc.	BLK 52 LOT 15 PH 3	500	510	14.281305	121.135589	3	1800	1807
2182	Sukimart Co.	#001	1700	1723	14.272964	121.125089	1	1500	1508
2183	Yukjo Food And Beverage House (The Crunch)	BLK 1 LOT 19	200	217	14.256313	121.129818	3	800	808
2184	Triple`C Sari-Sari Store	BLK 6 LOT 13 PH 2	1000	1014	14.275060	121.139542	1	1500	1513
2185	South Central General Construction Co., Inc.	C/O NESTLE PHILIPPINES	1100	1103	14.262629	121.127519	2	200	207
2186	Mr Automotive Batteries Trading	#607	200	217	14.252467	121.128611	1	1500	1516
2187	Seagen Technical, Marine Services & Consultancy Corp.	BLK 4-B LOT 2 CATALUNA ST.	300	317	14.234939	121.137958	2	1400	1406
2188	Benchef Food Hub	BLK 4 LOT 1	200	217	14.243704	121.113776	3	800	808
2189	Asral Consumer Goods Trading	J.P. RIZAL ST.	1400	1404	14.276661	121.123706	1	1500	1507
2190	Jeda`S-Allday Consumer Goods Trading	BLK 34 LOT 8	900	931	14.242966	121.151087	1	1500	1512
2191	Starbreaker Corp. (Pickup Coffee)	WALTERMART CABUYAO KM. 47	300	317	14.232506	121.132799	3	800	804
2192	Tj&Ben Consumer Goods Store	#226	900	931	14.235009	121.153984	1	1500	1507
2193	Sr Consumer Goods Store	BLK 28 LOT 52	1100	1110	14.271597	121.143505	1	1500	1507
2194	Henmark Scrap Trading	BLK 38 LOT 22	1600	1602	14.245268	121.137397	1	1500	1515
2195	Today`S Kid Creative Learning Center, Inc.	BLK 59 LOT 9&11	100	103	14.242220	121.168634	2	500	503
2196	Bethsky Merchandising	PILMART MARKET	300	313	14.228655	121.139393	1	1500	1507
2197	Roseglen Apartment	#286	1100	1111	14.263818	121.127446	2	200	201
2198	San`S Fruit Stall		1400	1402	14.277505	121.123659	1	1500	1504
2199	Timpug Mendoza Sari-Sari Store	B13 L79	1000	1011	14.271728	121.143451	1	1500	1513
2200	Krish Shane Sari-Sari Store	#59	900	922	14.234984	121.157927	1	1500	1513
2201	Boboy And Sonny Fish Vendor	PILMART MARKET	300	313	14.228550	121.139321	1	1500	1504
2202	Tiara Commercial & Industrial Corp.	LOT3 & 4 GYRO ST.	700	703	14.236299	121.106030	2	1700	1713
2203	Trinos Car Wash		1700	1723	14.272528	121.122111	2	100	103
2204	F.A. Terrible Vegetable Store	PILMART MARKET	300	313	14.228609	121.139461	1	1500	1504
2205	Chemplus Marketing & Trading	BLK10 LOT35	200	210	14.257441	121.134880	1	1800	1816
2206	Tulay Sa Pag-Unlad, Inc. ( A Microfinance Ngo)	2/F DON ONOFRE BLDG.	1700	1705	14.272540	121.124520	2	700	703
2207	Pulo Carwash Center	PASEO DE CABUYAO	1600	1617	14.244441	121.122256	2	100	103
2208	1025 Electrical & Hardware Supply	BLK41 LOT2	900	920	14.239715	121.148100	1	1500	1509
2209	1025 Electrical & Hardware Supply		1000	1005	14.282732	121.144711	1	1800	1814
2210	Tomifuji Co. Ltd.	BLK38 LOT26	200	209	14.250906	121.127426	1	1500	1507
2211	Tapia`S Enterprises		300	308	14.228592	121.138670	3	1800	1810
2212	Hhg Material Handling Services	BLK28 LOT3 PH1 ST. MARK ST.	1000	1012	14.269128	121.159650	1	1500	1507
2214	Piecess Rice Retailer	NIE MART	200	210	14.257503	121.135237	1	1500	1504
2215	Ten-Go Travel And Tours	#20	1600	1622	14.248165	121.129444	2	1600	1603
2216	Bended Industrial Services And Supply	B12 L21&23 TOPAS ST.	200	204	14.253087	121.131630	2	1400	1407
2217	Raquel Torres Trinos Meat Shop	#9	200	217	14.254146	121.128541	1	1500	1504
2218	Mackee`S Chicken Stall	PILMART MARKET	300	313	14.228451	121.139412	1	1500	1504
2219	Tobal Motorcyle Parts And Machine Shop	BLK14 LOT67	800	816	14.262377	121.156156	1	1500	1516
2220	Total Solution Instruments Corporation	UNIT 306 THE CENTRALE	200	216	14.241933	121.112463	1	1800	1812
2221	Tres Elazegui`S Angels Co.	BLK69 LOT9	900	907	14.237748	121.147187	1	1500	1507
2222	Ldm Apartment	L3377 KM45	200	212	14.253986	121.128463	2	200	211
2223	Truck Manufacturers Association, Inc.	UNIT 405 THE CENTRALE 	200	216	14.242013	121.112611	2	1400	1411
2224	Toolsco Industrial Corp.		1600	1617	14.243697	121.120171	1	1500	1509
2225	Terra Noble Realty Estate Inc.	BLK3 LOT2 AMPERE ST.	700	703	14.235152	121.093227	2	200	219
2226	Tri-Act Recycler Junkshop	WAREHOUSE 4 & 5	200	204	14.253173	121.131602	1	1800	1814
2227	Etoffe Creations	BLK7 LOT47 PH2	300	315	14.237309	121.138423	1	1500	1507
2228	The New Apec Development Corporation		1700	1723	14.266618	121.118170	2	200	219
2229	The Vera Cup-Fie Co.	UNIT 2 G/F SUNDREL BUSINESS CENTER 25 J.P RIZAL ST.	1700	1708	14.272489	121.125285	3	800	812
2230	Wmh Space Rental	92	300	317	14.230608	121.138809	2	200	211
2231	Yusha Hollow Blocks Trading		300	314	14.230652	121.143656	1	1100	1109
2232	Tierodman Auto Center Inc.		1700	1713	14.269027	121.125837	1	1500	1516
2233	Tobal Motorcycle Parts And Machine Shop	BLK 19 LOT 17 PH 1	1000	1012	14.269120	121.159644	1	1500	1516
2234	C.E. Timola Architectural Design Services	BLK 7 LOT 5 PH 2	1800	1805	14.238929	121.123639	2	1400	1408
2235	Filcan Motorcyle Parts And Accessories Shop	#297	1000	1008	14.275188	121.139613	1	1500	1516
2236	Tadashitec Global Corporation		1800	1822	14.236563	121.124807	2	1100	1104
2237	Mack Tapsilogan	ELSOL FOOD PARK	1500	1502	14.276272	121.122773	3	800	808
2238	Rbt739 Trucking Services	#0055	1000	1009	14.274945	121.139632	2	1700	1711
2239	The Perfect Spot (Tps) Realty & Property Management Inc.	BLK 11 LOT 18	200	210	14.257805	121.133268	2	200	219
2240	Dynamic Personnel Assistance Management	CENTENNIAL BUSINESS CENTER	1600	1622	14.246398	121.129473	2	1400	1407
2241	L.M.T. Commercial Building	NATIONAL HIGHWAY	300	312	14.230784	121.137052	2	200	211
2242	Cvt Up Electrical And Industrial Supplies Trading	ELSOL FOOD PARK ELSOL PLAZA	1500	1502	14.276259	121.122776	1	1500	1509
2243	Erlros Industrial Engineering Services	BLK 17 LOT 35 COMMERCIAL UNIT	1600	1601	14.241926	121.128486	2	1100	1111
2244	That Home, Inc.	UNIT 117 ANNIJO LAND DEVELOPMENT & LEASING CORPORATION	1700	1713	14.273806	121.119862	1	1500	1511
2245	Tmh Logistics Services	BLK 5 LOT 10 PH 2-A	500	508	14.281529	121.135809	2	1700	1706
2246	Aikah Fried Chicken House	#286	1000	1007	14.274948	121.139532	1	1500	1504
2247	Vaporjam Vape Shop	UNIT 10 MJSJ BLDG.	200	210	14.258377	121.132602	1	1500	1515
2248	Jat 888 Construction Services	BLK 1 LOT 109 PH 2	1800	1811	14.236698	121.123330	2	200	203
2249	Camella Lpg Store	BLK 9-A LOT 13	1200	1201	14.229238	121.089369	1	1500	1505
2250	Jerny`S Dimsum Foods	#56-A	200	212	14.252638	121.128806	3	800	812
2251	Wilma And Raymund Sari-Sari Store	BLK 13 LOT 1	1000	1011	14.271678	121.143826	1	1500	1513
2252	Hendri`X Sari-Sari Store	#45	200	212	14.253960	121.128502	1	1500	1513
2253	White House Store	CBD BLDG.	1600	1614	14.239191	121.135309	1	1500	1508
2254	Evertel Enterprises & General Services		1700	1723	14.266530	121.118181	2	1200	1206
2255	D.C Uson Jr. Service Station		200	212	14.253944	121.128496	3	100	104
2256	328 Realty Corporation		300	317	14.231604	121.137796	2	200	212
2257	Universal Storefront Services Corp.	#256 J. P. RIZAL ST.	900	931	14.234952	121.154647	2	700	708
2258	Universal Storefront Services Corp.	#232	300	308	14.228091	121.138918	2	700	708
2259	Universal Storefront Services Corporation	BLK206 LOT39	900	913	14.238727	121.161957	2	700	708
2260	Uncle Good Generics Drugstore Corporation	#229 J.P. RIZAL ST.	1300	1302	14.278280	121.124757	3	900	912
2261	South Star General Merchandise	STALL # 1	900	903	14.233946	121.149081	1	1500	1516
2262	Uni Nfm Industry, Inc.	BLK 35 LOT 37 PH 2	500	508	14.281562	121.135852	1	1500	1515
2263	Universal Storefront Services Corporation ( Pulo )	CENTRO MALL	1600	1614	14.242587	121.131169	2	700	704
2264	Getscom Trading	#413	200	212	14.253903	121.128459	1	1500	1509
2265	University Of Perpetual Help System Laguna Inc., (Maritime Training Center)		1000	1014	14.284220	121.144109	2	500	505
2266	J.M.S Rice Trading	BLK 180 LOT 7-J	900	913	14.238575	121.162040	1	1500	1504
2267	Usb Mnla Enterprises Opc	BLK 7 LOT 3	1800	1817	14.242594	121.143426	1	1800	1813
2268	Unick Enterprises Inc.	#280	1000	1007	14.277019	121.144041	1	1500	1515
2269	Perscents Official Perfume Trading	BLK 12 LOT 6 ELVISSA ST.	300	306	14.234733	121.137808	1	1500	1512
2270	E.U. Roofing Materials Trading		400	405	14.277229	121.135159	1	1500	1506
2271	Venus B. Velasquez Store	#658	1100	1103	14.259035	121.127738	1	1500	1513
2272	Mrrv Scrap Metal Trading	CARPENA COMPOUND	300	317	14.230703	121.138888	3	1800	1810
2273	Ysa Shutters Glass, Aluminum Supply & Fabrication		200	212	14.253824	121.128510	2	1100	1108
2274	J & G Villegas General Merchandise	#39	900	931	14.234980	121.157901	1	1500	1507
2275	Philippians 413 Rice Store	STALL # 1C-09 CABUYAO RETAIL PLAZA	1400	1402	14.277338	121.123562	1	1500	1504
2276	Sevenel General Services Corp.		1600	1617	14.242527	121.117366	2	200	212
2277	Pf Velasco Pharmacy - Medical Clinic	#164	1600	1614	14.265474	121.144267	3	900	913
2278	Pulo Glass,Aluminum & Iron Works	#186	200	217	14.249568	121.129099	2	1100	1108
2279	R. Vergara Trading		1600	1617	14.243717	121.119862	1	1500	1509
2280	Cocoy And Gigi`S Meat Stall		1400	1402	14.277448	121.123929	1	1500	1504
2281	Two Seventeen Rtw		1400	1402	14.277375	121.123592	1	1500	1501
2282	R.Q. Valle General Merchandise	B42 L5	500	508	14.282797	121.138547	1	1500	1507
2283	Ravc Rice Dealer		1400	1402	14.277481	121.123929	1	1800	1807
2284	Venture Motorcycle Sales Corporation	J.P RIZAL ST.	1700	1708	14.273753	121.124749	1	100	105
2285	Pf Velasco Pharmacy - Medical Clinic		200	210	14.257487	121.135093	3	900	912
2286	Vector Electrodynamic Technologies Inc.	C/O NESTLE PHILS. INC.	1100	1103	14.262683	121.127433	2	1000	221
2287	Rvistro Transport Services	BLK 40 LOT 28	1600	1602	14.245517	121.137268	2	1700	1710
2288	Rdsv Transport Services	BLK 8 LOT 2 PH2	300	315	14.238135	121.138960	2	1700	1710
2289	Ljjl Trading And Engineering Services	BLK 5 LOT 5	300	310	14.231675	121.140070	2	200	221
2290	Jimmy Velasquez Rice Store	#71	300	317	14.231523	121.138092	1	1500	1504
2291	Dpav Construction	BLK 4 LOT 35	1600	1604	14.252746	121.138796	2	200	204
2292	Joven Vejeras Enterprises (Don Benito`S Cassava Cake)		300	313	14.229150	121.138174	1	1500	1504
2293	Verga Engineering Services	BLK 3 LOT 5	1800	1809	14.235542	121.122475	2	200	209
2294	Rjcv Trucking Service	BLK17 LOT2	1600	1602	14.245684	121.137204	2	1700	1711
2295	Kokoy School Services	BLK22 LOT2	200	209	14.250984	121.127446	2	500	504
2296	Esv General Merchandise	BLK26 LOT46	200	207	14.249861	121.128781	1	1500	1509
2297	Evjr Lpg And Lpg Accessories Trading	#485	1000	1014	14.274788	121.139517	1	1500	1505
2298	Edwin Vitto Meat Shop	#42-A	1800	1822	14.244100	121.139605	1	1500	1504
2299	Laine Vill Commercial Lot And Building Rental		300	314	14.231909	121.145525	2	200	211
2300	Lasovelle Food Hub	CENTRO MALL PULO	1600	1614	14.242556	121.131169	3	800	812
2301	Cj Motorcycle Parts And Accessories Shop	#239 J.P. RIZAL ST.	1300	1302	14.279078	121.122843	1	1500	1516
2302	Nj Lpg Trading	BLK 19 LOT 17 PH 2	300	315	14.235846	121.136934	1	1500	1505
2303	Commercial Lot Rental Vhf	#264	1600	1622	14.248866	121.132346	2	200	211
2304	Seojoon Apartment	BLK 3 LOT 19	1700	1711	14.266578	121.127110	2	200	214
2305	Kuya Cris Carwash And Detailing Services		400	405	14.277016	121.134264	2	100	103
2306	Vhinz Lpg Trading	#11 GRASYA ST.	1700	1703	14.274436	121.119473	1	1500	1505
2307	Vserve International Corporation	#444 VH COMPOUND	200	217	14.254067	121.128548	3	1800	1808
2308	Valencia Garments Manufacturing	BEDEK RETAIL PLAZA	500	510	14.288396	121.136660	1	1100	1106
2309	Hannea Logistics Services	BLK 12 LOT 54	1000	1011	14.271730	121.143433	2	1700	1706
2310	Vjc Atlas Exhibits & Marketing Corp.	DIVIMALL PULO	1600	1614	14.243083	121.131704	2	200	217
2311	Vch Corporation	#001	1700	1720	14.271647	121.123274	2	200	211
2312	J M K Procyon G A S Lpg Outlet	BLK 11 LOT 34	800	813	14.259621	121.151205	1	1500	1505
2313	Aqua`Vita Water Refilling Station	BLK 64 LOT 4	100	103	14.242883	121.169589	1	1500	1517
2314	Virgo Game Ventures Inc. (Grayoo Gift Shop)	WALTERMART CABUYAO KM. 47	300	311	14.232488	121.133946	1	1500	1501
2315	Jrv E-Bike Shop	DIVIMART BANLIC	300	314	14.230374	121.142815	1	1500	1516
2316	Aehrold James Sari-Sari Store	BLK 9 LOT 2 .ARABELLA HOMES	1600	1601	14.241663	121.127996	1	1500	1513
2317	Eduard Sari-Sari Store	BLK 10 LOT 62 PH 2	300	315	14.237865	121.139074	1	1500	1513
2318	M And N Consumer Goods Store	BLK 6 LOT 2	1000	1011	14.271601	121.143708	1	1500	1513
2319	Lkb Pet Supplies And Accessories Shop	BLK 3-D LOT 8	300	306	14.234699	121.137610	1	1500	1515
2320	M And N Pet Shop	BLK 6 LOT 2	1000	1011	14.271775	121.143464	1	1500	1515
2321	Verde Karne Inc.	BLK 2 LOT 4 PH 3	1800	1809	14.235685	121.122303	3	1800	1807
2322	Jfit Gym		300	317	14.231733	121.138422	2	1300	1304
2323	Wyeth Philippines, Inc.	CIE REALTY	1200	1205	14.221694	121.069563	1	1100	1105
2324	Wee Development Corporation		300	317	14.231847	121.138509	2	200	212
2325	Whiz Kidz Montessori Schoolhouse Inc.	BLK19 LOT-2A (20 UNITS)	1800	1803	14.242447	121.134511	2	500	503
2326	Wiz Winner Construction Services, Inc.	C/O P&G	700	703	14.232649	121.098702	2	200	205
2327	Willow Park Hoa, Inc.	CLUBHOUSE	1600	1621	14.249340	121.131889	2	1400	1411
2328	Waffle Time, Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232354	121.133950	3	800	808
2329	Whiz Kids Montessori Schoolhouse Inc	BLK-1D LOT1	300	306	14.235670	121.140251	2	500	503
2330	Westbridge Institute Of Technology, Inc.	#1	300	317	14.231979	121.138160	2	500	507
2331	Waffle Time Incorporation - Centro Mall	CENTRO MALL	1600	1614	14.242535	121.131201	1	1500	1507
2332	Westbridge Institute Of Technology, Inc.	CENTRO MALL	1300	1307	14.279487	121.122801	2	500	503
2333	Westbridge Institute Of Technology, Inc.	#0110	1000	1005	14.282059	121.144798	2	500	507
2334	Allgeneriks Pharmacy		1600	1617	14.242474	121.116417	3	900	912
2335	Waltermart Supermarket, Incorporated	WALTERMART CABUYAO KM. 47	300	311	14.232218	121.134058	1	1500	1507
2336	Wall Street Courier Services, Inc. (Ninja Van)		1600	1614	14.248396	121.129440	2	1700	1713
2337	Wow Brand Holdings Inc. (Potato Corner)	SAVEMORE MARKET J.P. RIZAL ST. CORNER A. BONIFACIO ST.	1400	1401	14.276682	121.124092	1	1500	1504
2338	Wyeth Nutrition	WYETH WAREHOUSE EXTENSION CIE REALTY	1200	1205	14.221743	121.069548	1	1100	1105
2339	2-Big Brother Refilling Station	BLK15 LOT11	1600	1612	14.239100	121.130153	1	1500	1517
2340	Trip Ng Masa Hot Pandesal	B10 L28	200	210	14.257320	121.134471	1	1500	1504
2341	Hantverk Technologies	BLK14 LOT23 OPAL ST.	1700	1722	14.270505	121.127425	1	1500	1509
2342	Japan Home Centre	WALTERMART CABUYAO KM. 47	300	311	14.232106	121.134049	1	1500	1507
2343	South Star Hardware	#16	300	317	14.232016	121.138646	1	1500	1509
2344	Yamapro Corporation	B22 L18	200	207	14.249874	121.128823	1	1500	1509
2345	Jmy Precision And Industrial Services		900	903	14.233736	121.149165	2	1100	1111
2346	Ycab Angels Inc.	PHOENIX GASOLINE STATION	300	308	14.233453	121.134928	1	1500	1504
2347	Yello X Supply Chain Solutions, Inc.	FUSION ST.	700	703	14.235873	121.103588	2	1700	1713
2348	Msj Water Refilling Station	#148	1700	1723	14.266555	121.118123	1	1500	1517
2349	Msj Consumer Goods Trading	#148	1700	1723	14.266597	121.117960	1	1500	1504
2350	Kirsten Lpg Store	BLK 6-A LOT 153	900	915	14.242976	121.151107	1	1500	1505
2351	Banlic Aircondition And Refrigeration Parts Trading		300	317	14.231902	121.138896	1	1500	1507
2352	Zotal Blessed Corp.		1400	1402	14.277475	121.124002	2	1300	1307
2353	Zotal Blessed Corp.	WALTERMART CABUYAO KM. 47	300	311	14.232606	121.133247	2	1300	1307
2354	Z8Eleven Corp. Doing Business Under The Name And Style Of Smj Pawnshop	BLK180 LOT-7E	900	913	14.236887	121.157748	2	700	709
2355	Canto-Almuzal Restaurant	#75	1500	1504	14.274881	121.125259	3	800	812
2356	Center Point Builders Supply	NATIONAL HIGHWAY	300	311	14.232052	121.135876	1	1500	1506
2357	Victoria Manpower Services Opc	BLK 4 LOT 15	1200	1204	14.230988	121.091121	2	1400	1407
2358	Cabuyao Land Ventures & Development Inc.		900	931	14.237360	121.151083	2	200	216
2359	Bryte Teknology Corporation	UNIT 8 NATIONAL ROAD	1600	1608	14.243451	121.131320	1	1800	1809
2360	Schola Angelicus, Inc.		1800	1822	14.244121	121.139462	2	500	503
2361	Philippine Seven Corporation (7-Eleven)	#542	1100	1112	14.259622	121.127899	1	1500	1502
2362	Elnatan Enterprise	TAMIS COMPOUND	300	316	14.235381	121.132481	1	1100	1113
2363	Orthopaedic International, Inc.	#9 WEST ROAD	700	703	14.233899	121.090183	1	1100	1113
2364	Motamax Motor Rewinding Services	BLK 9 LOT 13	1600	1612	14.238059	121.122690	2	100	106
2365	Ceva Logistics Philippines, Inc.	BLK 2 LOT 1 THE CENTRALE BUILDING	200	216	14.241912	121.112498	2	1700	1704
2366	Bdo Network Bank, Inc. (A Rural Bank Of Bdo)	2ND FLOOR JAP LANDMARK BLDG. #8 J.P. RIZAL ST.	1500	1503	14.275539	121.124119	2	700	702
2367	Keansburg Marketing Corporation		1700	1713	14.269755	121.124969	3	1800	1812
2368	Dama Hardware		400	405	14.277325	121.135660	1	1500	1509
2369	Alpamayo Lending Inc.	RAM FOOD PRODUCTS INC. COMPOUND	1600	1622	14.244462	121.132368	2	700	707
2370	Jamisola Design And Builders	BLK 2 LOT 10	800	813	14.260370	121.151346	2	200	202
2371	Medexpress Drugstore	UNIT A CASA FRANCO APARTMENT	1600	1617	14.246041	121.128071	3	900	912
2372	Edge Automation Technology Services Co.	BLK 2 LOT 29 VALENCIA ST.	1200	1201	14.229316	121.089723	2	1000	221
2373	Advanced Global Water Technologies (Philippines) Inc.	ROOM 406 4TH FLOOR THE CENTRALE BUILDING	200	216	14.241880	121.112509	2	1400	1415
2374	Nwow Marketing	#11 J.P. RIZAL ST.	1500	1503	14.275184	121.124457	1	1500	1516
2375	Xr Royale Marketing And Warehousing Corp.	NATIONAL HIGHWAY	300	311	14.231911	121.135996	2	1700	1713
2376	Anglo Realty	COMMERCIAL BUILDING	400	412	14.282787	121.126702	2	200	219
2377	Jy And Sons Realty Co., Inc.	ION ST.	700	703	14.235169	121.110593	2	200	222
2378	Vhen Del Construction Supplies	UNIT1 DAVID-CORNELLA APARTELLE	300	317	14.231516	121.139021	1	1500	1507
2379	Jldconcord Industrial Supply	B3 L8	1200	1201	14.228944	121.090611	1	1500	1509
2380	Mini Depato Corp. ( Miniso)	WALTERMART CABUYAO KM. 47	300	311	14.232271	121.133391	1	1500	1507
2381	Best Brand Group Distribution Corp.	B20 L48 PH 1	1000	1012	14.269385	121.159615	3	1800	1816
2382	Manuventures, Inc.	BLK 4 LOT 4	200	206	14.254627	121.130918	2	1100	1102
2383	Bpi Direct Banko, Inc., A Savings Bank		1700	1713	14.271163	121.122928	2	700	702
2384	Edali Properties, Inc.	THE CENTRALE BUILDING	200	216	14.242115	121.112393	2	200	211
2385	Gerardo L. Limcaoco Real Estate Leasing		1600	1617	14.242443	121.116417	2	200	211
2386	Stalwart Automotive Opc		1700	1713	14.267110	121.127118	1	1500	1516
2387	Genpacco, Inc.		1200	1205	14.223196	121.072561	2	200	211
2388	M.Paras Trucking Services Co.	BLK 5 LOT 18	200	204	14.252990	121.131485	2	1700	1711
2389	Joredabe Industrial Corp.	BLK 180 LOT 9D	900	913	14.237839	121.157809	1	1500	1509
2390	Alfametro Marketing, Inc.	LOT15-A	400	405	14.278198	121.137082	1	1500	1502
2391	Grandmore Phils. Steel Corp.		300	314	14.231311	121.144212	2	1700	1713
2392	Trans-World International Logistics Corporation		300	312	14.230717	121.137114	2	1700	1704
2393	Emmanuel Sjb Development Corporation	#1	1800	1808	14.239241	121.132988	2	200	211
2394	Johnica Convenience Store ( 7 - Eleven )	PULO-DIEZMO ROAD	1600	1620	14.243574	121.119460	1	1500	1502
2395	Bedarra Holdings, Inc.	CANLUBANG GOLF & COUNTRY CLUB INC.	600	607	14.200207	121.043865	2	600	604
2396	Kuda Eco Friendly Corporation	#21 J.P. RIZAL ST.	1500	1503	14.274840	121.124634	1	1500	1516
2397	Track N Go Trucking Services	B1 L62	1600	1601	14.241595	121.127970	2	1700	1711
2398	Variable Air Solutions And Services Co.	BLK 20 LOT 48 PH.2	300	315	14.235424	121.135541	1	1500	1509
2399	Philippine Seven Corporation ( 7 - Eleven)		900	902	14.236708	121.165999	1	1500	1502
2400	Annijo Land Development & Leasing Corporation		1700	1713	14.270713	121.123429	2	1700	1713
2401	J. Herdz Rice Trading	#22 J.P RIZAL AVENUE	1500	1503	14.274600	121.124727	1	1500	1504
2402	Rasay-Tuico Industrial Gas Trading		1600	1617	14.245814	121.124822	1	1800	1808
2403	Versy Steel Trading		200	212	14.250906	121.128824	1	1500	1509
2404	Fast Toll Manufacturing Corp.	C/O NUTRIASIA MAIN AVE.	700	703	14.238236	121.114741	2	1100	1102
2405	Bestlink Resources, Inc.	2ND FLR. ROOM VII EASTLAND II BLDG.	1600	1608	14.243048	121.131490	2	1400	1407
2406	Abe And Calixo Aircon & Refrigeration Services	B34 L13 PH3	900	906	14.242689	121.156742	2	1200	1211
2407	Fast Toll Manufacturing Corp.	FAST LOGISTICS COMPLEX	1600	1617	14.238445	121.114784	2	1100	1102
2408	Hard Discount Philippines, Inc. (Dali Store)	#169	900	909	14.235062	121.153036	1	1500	1508
2409	Hard Discount Philippines, Inc. ( Dali Store )	WAYNE MART BLDG. GROUND FLR.	900	920	14.239538	121.147205	1	1500	1508
2410	Grand Blessing Realty And Development Inc.		1600	1614	14.248405	121.129435	2	200	211
2411	Amiresa Corporation		1700	1713	14.270835	121.123301	1	1500	1516
2412	Aerich Innovation Corp.	BLK4 LOT2	200	201	14.253657	121.137610	1	1500	1515
2413	Unidoor Systems, Inc.	GYRO ST.	700	703	14.233273	121.106153	1	1100	1112
2414	Goldilocks Bakeshop, Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232065	121.133406	1	1500	1504
2415	King Global Sanitary Products Inc.	JRK COMPOUND	200	212	14.253740	121.128448	1	1100	1116
2416	Fill N` Go, Opc	MANILA SOUTH ROAD COR. FB BAILON ST.	1700	1713	14.271305	121.123045	3	100	104
2417	Dynamiq Cirque General Services Inc.	BLK 36 LOT 7	200	207	14.249896	121.128884	2	1400	1407
2418	Mizata Corporation	#75	1500	1504	14.274978	121.125176	1	1100	1112
2419	Bonus Shopping Mart Inc.	J.P. RIZAL ST.	1500	1503	14.274893	121.124369	1	1500	1507
2420	Smc Repairs And Maintenance Inc.	SILANGAN INDUSTRIAL ESTATE	1200	1205	14.221333	121.075204	2	1400	1413
2421	Coffee Enthusiasts Consumer Goods Retailing	#17	1800	1808	14.239395	121.143097	1	1500	1507
2422	Outsource1 Corporation	#12	1800	1808	14.239384	121.143065	2	1700	1706
2423	5 Axis International Corporation	BLK-3A LOT-1A	1600	1617	14.242908	121.117288	2	1400	1415
2424	Philippine National Bank	ABI COMPLEX	1700	1713	14.269689	121.124669	2	700	702
2425	J. Alcabasa Enterprises & General Services, Inc.		1700	1723	14.272730	121.124911	2	1400	1407
2426	Elizabeth Dela Cruz Aragon Meat Store	#23	1600	1622	14.248899	121.132208	1	1500	1504
2427	A.E. Alzola Construction	BLK 15 LOT 24	1600	1620	14.245139	121.119103	2	200	220
2428	Jlex Builders Construction	#98	1600	1622	14.244834	121.130672	1	1500	1509
2429	Aliw Alexis Farms, Inc.- Branch Ii		1100	1112	14.262684	121.126385	1	1100	1101
2430	Alcasabas Poultry Farm		1100	1112	14.262823	121.128170	1	1100	1101
2431	Don-Al Enterprises Co.		300	317	14.231001	121.138907	1	1500	1515
2432	Christian Ley Construction	#20 BURGOS ST.	1300	1308	14.280863	121.124838	2	200	204
2433	Peter Anthony Memorial Garden		1600	1614	14.241199	121.132104	2	200	216
2434	Asa Philippines Foundation Inc. (A Microfinance Ngo)	141 A. BONIFACIO ST.	1400	1401	14.277170	121.125135	2	700	703
2435	Asia Consumer Value Trading Inc.	#310 J.P. RIZAL ST.	1300	1302	14.276691	121.123664	1	1500	1507
2436	Southern Sky Construction Supply	PUROK 1 	300	308	14.232135	121.136047	1	1500	1509
2437	Eatlink Convenience Store ( 7 - Eleven )	CENTENNIAL BUSINESS CENTER	1600	1617	14.246336	121.129526	1	1500	1502
2438	Arksun Construction Supply		1700	1710	14.276220	121.129192	1	1500	1509
2439	Act Centerline Electrical & Mechanical Corporation	#1460 HEMEDEZ COMPOUND	1100	1102	14.263561	121.126748	2	200	204
2440	Abenson Ventures, Inc. (Furnitures)	WALTERMART CABUYAO KM. 47	300	311	14.232054	121.133452	1	1500	1506
2441	Jjjm Sun Enterprises	BLK8 LOT3	200	209	14.250487	121.127105	2	1700	1711
2442	All Pack Inc.	BLK3 LOT9	1600	1603	14.242599	121.129351	3	1800	1815
2443	Mardiel Trading	BLK 11 LOT 31 PH5	800	816	14.263278	121.155568	1	1500	1507
2444	Allied Machineries International Shippers, Inc.	80 AMIS BLDG.	300	311	14.232022	121.135952	2	1700	1711
2445	Alfametro Marketing, Inc.	B5 L23	1700	1720	14.271669	121.123231	1	1500	1502
2446	Alfametro Marketing, Inc.		900	931	14.237406	121.151061	1	1500	1502
2447	Alfametro Marketing, Inc.	LOT 917 ALFAMART	500	510	14.286321	121.140008	1	1500	1502
2448	Alfametro Marketing, Inc.	LOT 5611 APLAYA ST.	100	104	14.242878	121.170589	1	1500	1502
2449	Qsl Grocery	JP RIZAL ST.	1300	1302	14.277839	121.123109	1	1500	1508
2450	Alfametro Marketing, Inc.	LOT 704-C	400	409	14.288193	121.129173	1	1500	1502
2451	Johnica Easy Mart ( 7 -  Eleven )	6F RLI BLDG. BLK3 LOT3	200	216	14.242430	121.113350	1	1500	1502
2452	Alfametro Marketing, Inc.	LOT 1867	1000	1007	14.275084	121.139363	1	1500	1502
2453	Alfametro Marketing, Inc.	ALFAMART LOT 555	400	414	14.281966	121.126346	1	1500	1502
2454	Alfametro Marketing, Inc.	B3 L18-19	1000	1013	14.278196	121.145478	1	1500	1502
2455	Alfametro Marketing, Inc.	GRD. FLR. & 2ND FLR BLK1 LOT26-27	200	210	14.256417	121.130141	1	1500	1502
2456	Dn Angeles Construction	BLK13 LOT45	1600	1620	14.244972	121.119178	2	200	221
2457	A And F Tripoint Builders Corp.	BLK15 LOT12&14	1600	1620	14.244433	121.118587	2	200	221
2458	Zettafarms, Inc.		1600	1622	14.248954	121.132152	1	1100	1101
2459	Bank Of The Philippine Island (Niugan Branch)		1100	1103	14.259952	121.125511	2	700	702
2460	Bank Of The Philippine Islands (Lisp- I Branch)		700	703	14.237805	121.101618	2	700	702
2461	Robien Ann Enterprises	BLK 22 LOT 35	200	210	14.261258	121.133186	2	1400	1407
2462	Bca Construction Supply	LOT 8117-B	400	414	14.276001	121.128657	1	1500	1509
2463	Bca Construction Supply		1700	1723	14.276172	121.128610	2	200	204
2464	Krizalen Trucking Services	7440 ME(B)	1800	1822	14.244134	121.139540	2	1700	1711
2465	The Alpha Enterprise	UNIT H RLI BLDG.2 B4 L2	200	216	14.242756	121.113299	1	1500	1507
2466	Rc Bella Waste Management & Disposal Services	#337	1100	1112	14.262757	121.126545	2	1400	1407
2467	Doban Construction Enterprises	8-A2 COMMERCIAL AREA	1800	1803	14.241748	121.128483	2	200	220
2468	Bernabe Construction & Industrial Corporation ( Of Asia )	C/O P&G	700	703	14.232714	121.098762	2	200	208
2469	Fmb Wood Trading		1600	1617	14.242588	121.120367	1	1100	1113
2470	Zhen Sherwin Funeral Homes		900	922	14.235106	121.153796	2	1200	1203
2471	Marco Lorenzo Hardware & Construction Supply	 MAMATID ROAD	900	922	14.235093	121.153660	1	1500	1509
2472	Rldb Trading	MARINIG ROAD	1700	1702	14.275699	121.128254	2	1700	1705
2473	Bedek Foods Corp. (Mang Inasal)		300	317	14.230983	121.139082	3	800	806
2474	Bardstown, Inc. (Kfc)	CENTRO MALL	1600	1614	14.242525	121.131190	3	800	806
2475	Big8 Marketing Inc.	BLK2 LOT24	1600	1604	14.242000	121.135662	3	1800	1812
2476	Drb Enterprises	BLK11 LOT1	1800	1819	14.242152	121.139369	2	1400	1407
2477	Borland Development Corporation		1700	1709	14.275450	121.132541	2	200	219
2478	Blues Brothers Inc.	J.P RIZAL AVE.	1500	1503	14.274742	121.124412	1	1500	1501
2479	R And C Cantalejo Meat Shop	#555	1100	1112	14.259344	121.127925	1	1500	1504
2480	Prime Veterinary Phils., Inc.	78	1800	1822	14.241893	121.142261	3	1800	1801
2481	Canlubang Golf & Country Club, Inc. (Restaurant)		600	607	14.200179	121.043861	3	800	812
2482	Commercial Heartland Inc.	#5 DIODE ST.	700	703	14.236832	121.100297	2	1700	1713
2483	Rowena Enterprises	BLK20 LOT43 MAHIYAIN ST.	200	210	14.261041	121.132323	2	1400	1407
2484	Cebuana Lhuillier Pawnshop - Mamatid Branch		300	317	14.232016	121.137997	2	700	709
2485	Cabuyao Leisure And Sports Club Corp.		1600	1617	14.242526	121.116449	3	800	802
2486	Cebuana Lhuillier Pawnshop-Cabuyao 2 Branch	#7520 J.P RIZAL AVE.	1500	1503	14.275899	121.124041	2	700	709
2487	Cbt Realty & Development Corp.	ENERGY ST.	700	703	14.235630	121.102748	2	200	212
2488	Crutech & Tooling Precision	9104 VCH CPD.	1700	1720	14.273084	121.124689	1	1100	1112
2489	Shemars Enterprises	#49	1600	1622	14.246923	121.129796	2	1100	1104
2490	Tri-Magic General Merchandise	BLK80 LOT1 & 2	100	103	14.242821	121.169694	1	1500	1507
2491	Central Park House Of Chicken Corporation (Andok`S)		300	308	14.228486	121.138938	1	1500	1504
2492	Charus Credit Services Inc.	#288	200	217	14.265303	121.144323	2	700	707
2493	Jlm Canteen	NUTRI-ASIA	1600	1605	14.249000	121.132183	3	800	802
2494	Eco-Term Pest Control Service	#148	600	602	14.178297	121.023841	2	1200	1209
2495	Center For Agriculture And Rural Development (Card), Inc.(A Microfinance Ngo)	BLK 2 LOT 1	300	305	14.231630	121.136394	2	700	703
2496	Emjgc Diseño And Konstrukt	BLK3 LOT39 PH1	200	211	14.264296	121.144719	2	200	204
2497	Coir Nutri8 Agriventures Corp.	BLK 34 LOT 32 MICLAT ST.	900	914	14.243307	121.156851	1	1500	1507
2498	Cjj Healthy Options Corporation	AMPLEON PHILIPPINES INC. PHILIPS AVE	700	703	14.231674	121.095834	3	800	802
2499	Cbt Realty & Development Corporation	HOLOGRAM ST.	700	703	14.234610	121.108044	2	200	211
2500	Centennial_Leasing Inc.	CENTENNIAL BUSINESS CENTER	1600	1617	14.246430	121.129516	2	200	211
2501	Fla-Bell Trucking Services	#815	800	818	14.252130	121.167849	2	1700	1711
2502	Gemyl Trading	#322	900	931	14.235770	121.155159	3	1800	1810
2503	Javen Moving Services		1600	1617	14.242087	121.116077	2	1700	1704
2504	Brooksbrother Heavy Lift And Transport Services Inc.	BROOKSBROTHER HEAVY LIFT AND TRANSPORT SERVICES INC.	1600	1622	14.242592	121.119595	2	1700	1711
2505	A And Aimee Laboratories	BLK31 LOT33	200	205	14.253687	121.128688	1	1100	1113
2506	4 Pillars Enterprise	B3 L4	1600	1603	14.242628	121.129602	2	1700	1711
2507	Dynav Construction Corporation	DYNAV CONSTRUCTION CORPORATION	1300	1311	14.280458	121.124546	2	200	221
2508	Desmark Corporation	#113	300	308	14.229100	121.138366	3	100	105
2509	Mdelatorre Engineering Services And Supply	UNIT 1 SOUTHPOINT SQUARE BUILDING 1 B4 L1	200	216	14.243017	121.113635	1	1500	1509
2510	Rg Dagasdas Electrical Construction Services	BLK 14 LOT 13 PH5	800	816	14.259898	121.154445	2	200	221
2511	El Sol Realty & Development Corporation (Shopping Center)	EL SOL PLAZA	1400	1403	14.277122	121.123420	2	200	211
2512	Epc & I Corporation	#9217	700	701	14.244334	121.122510	2	200	208
2513	Jme Welding And Grinding Shop		1600	1617	14.242516	121.116449	2	100	102
2514	Ecostrong Builders Corporation	NIA ROAD	200	201	14.253603	121.137632	3	1800	1816
2515	Eternaland Corporation	#41 J.P. RIZAL	1300	1302	14.278583	121.123159	2	200	216
2516	Eco Fortunes Group Inc.		1800	1822	14.239081	121.133061	1	1800	1814
2517	Expressions Stationery Shop, Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232017	121.133668	1	1500	1507
2518	Ever Last Marketing And Trading Corp.	KM. 48	1600	1614	14.248398	121.129438	3	1800	1814
2519	Escuadro Enterprises	BLK 9A LOT 15	1200	1201	14.229228	121.089379	2	1700	1711
2520	Entech Industrial Supply & Services Corporation	BLK 17 LOT 38 COMMERCIAL UNIT	1600	1601	14.240030	121.126199	2	1100	1104
2521	Fsa-Technology Inc.	UNIT 2-A RLI BLDG.	200	216	14.242136	121.113233	3	1500	1507
2522	Feloli Realty, Inc.	#88 FELIX LIMCAOCO ST.	1300	1304	14.278783	121.124446	2	200	214
2523	First Philippine Holdings  Corp.	AMPERE ST. COR. MAIN AVE.	700	703	14.234389	121.093567	2	200	211
2524	Fully Advanced Manpower Solutions Inc.		200	212	14.251658	121.128924	2	1400	1407
2525	Allday Convenience Store	B8 	1800	1805	14.239199	121.126053	1	1500	1502
2526	Ncf Engineering Services	BLK 17 LOT 43 COMMERCIAL UNIT	1600	1601	14.241895	121.128593	2	200	208
2527	Focused Test Philippines, Inc.	3RD FLR. FASTECH BLDG. 3 MAIN AVE. AMPERE ST.	700	703	14.229897	121.093985	2	200	209
2528	Familyhealth & Beauty Corp.	SAVEMORE MARKET	300	308	14.227454	121.138046	1	1500	1507
2529	The Generics Pharmacy	BLK1 LOT13 PH2	200	211	14.264456	121.144015	3	900	912
2530	Ftpontillo Builders And Engineering Services	LOT 1-G-1	1800	1822	14.239256	121.126015	2	200	221
2531	Fast Services Corp.	C/O NUTRI-ASIA	700	703	14.239112	121.115771	2	1700	1713
2532	Goldilocks Bakeshop, Inc.	C/O RAQUEL PAWNSHOP	300	308	14.227867	121.139111	1	1500	1504
2533	Green Boys Group, Inc.	#290 CARPENA SUBDIVISION	300	314	14.231220	121.144676	2	1700	1705
2534	Gleent Incorporated	2ND FLOOR SUNDREL BUSINESS CENTER	1700	1723	14.275460	121.124174	2	1000	1003
2535	Golden Peak Food Corporation	WALTERMART CABUYAO KM. 47	300	311	14.232267	121.133057	3	800	812
2536	Melistar Hardware	#213	1600	1622	14.243253	121.130944	1	1500	1509
2537	Goldenlion Construction Supply Corp.	LOT 11	1100	1107	14.262258	121.124326	1	1500	1509
2538	Goldilocks Bakeshop, Inc.	CENTRO MALL	1600	1614	14.242618	121.131319	1	1500	1504
2539	Exly Enterprise		1600	1617	14.243004	121.118004	1	1500	1509
2540	(Dunkin` Donuts) Golden Peak Food Corporation	JVH BUSINESS CENTER	300	313	14.228670	121.139873	3	800	812
2541	Golden Field Motorworks Corporation	3620 MANAHAN WAREHOUSE	200	217	14.253995	121.128548	2	100	101
2542	Hbf Realty Corporation	#11 GYRO ST.	700	703	14.234244	121.105621	2	200	212
2543	Seapowers  Trading, Industrial Services And Construction		900	923	14.236563	121.164475	2	200	203
2544	Adtek Wood Industry, Inc.		300	307	14.229294	121.140380	1	1100	1113
2545	(Red Ribbon Bakeshop Inc. )Handsel Pinoy Food Enterprises Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232028	121.133315	1	1500	1504
2546	(Red Ribbon Bakeshop Inc.) Handsel Pinoy Food Enterprises Inc.	LOT 4525A	300	308	14.228182	121.138865	1	1500	1504
2547	Heat Exchanger Fabricator Inc.	BLK16 LOT8	1600	1603	14.242874	121.129197	2	1400	1407
2548	Herstal Advanced Security Agency Inc.	BLK8 LOT11 SAMPAGUITA ST.	1600	1620	14.244767	121.119056	2	1400	1414
2549	Havi Logistics Philippines, Inc.	RCS NORTH INC.	1200	1205	14.227533	121.085308	2	1700	1713
2550	Infant Jesus Montessori Center, Inc. (Main)		300	302	14.228498	121.137377	2	500	502
2551	Intas Packaging, Inc.		1600	1617	14.242025	121.115762	2	1700	1713
2552	Infini Mart, Inc.	KM. 46	1600	1622	14.249043	121.132077	1	1500	1507
2553	Inventory Excellence Logistics Services Inc.	C/0 RFM	1600	1622	14.248973	121.132068	2	1700	1713
2554	Jo Jacjon Realty & Dev`T. Corp.  Subd. (Developer)		1100	1112	14.262624	121.126743	2	200	219
2555	Joyce & Diana Worldwide Inc.	#05	200	205	14.255890	121.131123	1	1100	1106
2556	Triple John Jeturian Junior Inc.	WAREHOUSE 10	200	204	14.252520	121.130981	3	1800	1816
2557	Jbrother Marketing	BLK 1	200	205	14.254038	121.129358	1	1500	1507
2558	Jpt Pro-Earth Services, Inc.		300	317	14.230714	121.138365	2	1700	1713
2559	J&J Midtrans Corp.	#97 BE	300	308	14.229007	121.138448	2	1700	1705
2560	Jjlc Logistics, Phils. Corp.		1600	1617	14.241421	121.117931	2	1700	1711
2561	Johntrix Technical Services Inc.	#231	1600	1619	14.246300	121.128971	2	1400	1407
2562	Jimi Tubing Specialist, Inc.	BLK5 LOT6 IPIL ST.	1600	1603	14.242870	121.129189	2	1400	1407
2563	Jemtroil General Services Inc.	BLK 5 LT 8 IPIL ST.	1600	1603	14.242774	121.129057	2	1700	221
2564	Kpi Warehouse Holdings, Inc.		1600	1617	14.239743	121.105708	2	1700	1713
2565	Kampanang Ginto Printing Press & Copy Center	G/F KAMPANANG GINTO BLDG.	1700	1720	14.271942	121.123561	2	400	404
2566	Kuda Eco Friendly Corporation	223	300	313	14.229859	121.137960	1	1500	1516
2567	Tuding`S & Gener Porkchop Atbp.	UNIT D DON ONOFRE BLDG. 3	1700	1720	14.272607	121.124440	3	800	812
2568	Cazl-L Convenience Store	BLK4 LOT1 SOUTHPOINT SQUARE	200	216	14.272607	121.124440	1	1500	1502
2569	Lbc Express, Inc. (Tres)	#8 JP RIZAL AVE.	1500	1503	14.275469	121.124169	2	1700	1702
2570	Cabuyao Manpower Services	#236 J.P. RIZAL ST.	1300	1302	14.278545	121.122856	2	1400	1407
2571	Laguna Packaging Equipment Corp.	BLK3 LOT9	1600	1603	14.243062	121.130579	2	1100	1102
2572	Fast Curing Construction And Supply	#118	400	407	14.284708	121.128154	2	200	203
2573	Lancashire Realty Holdings, Inc.		1200	1205	14.221094	121.074876	2	200	219
2574	Gnbtl Trucking And Hauling Services	BLK1 LOT8	200	216	14.242025	121.113027	2	1700	1705
2575	Lotus Royalle Transport Corp.		300	308	14.229883	121.137914	2	1700	1709
2576	Ideal Vision Center	WALTERMART CABUYAO KM. 47	300	311	14.232698	121.134370	1	1500	1507
2577	Amll Real Estate Lessor		1600	1617	14.242727	121.117390	2	200	211
2578	Kcino Marketing	#43	200	212	14.253854	121.128603	1	1500	1516
2579	Ctz Lumber And Hardware		300	312	14.230701	121.136864	1	1500	1509
2580	Lettered L Food Services, Inc.	NESTLE CABUYAO	1100	1103	14.260744	121.125838	3	800	802
2581	Media Construction & Development Corp.	#3610	1600	1617	14.243254	121.117946	2	200	203
2582	Reymar Industrial Services	#3340 ME	200	212	14.249768	121.129248	2	1100	1104
2583	Mrz Transpo Inc.		1600	1617	14.242608	121.117577	2	1700	1709
2584	Mrtc Trucking Services Corporation	#30	1100	1112	14.262738	121.126646	2	1700	1705
2585	Bernatech Precision Toolings And Industrial Services	NATIONAL HIGHWAY	300	312	14.230417	121.137236	2	1100	1104
2586	Motorcentral Sales Corporation-Branch	#25 SUNDREL BUSINESS CENTER J.P.RIZAL ST.	1700	1708	14.272580	121.125369	3	100	105
2587	M.P. Kagaoan Enterprises, Inc.		1600	1617	14.242723	121.117525	2	1700	1711
2588	Marissa Hermosado Enterprises	#69 HEMEDEZ COMPOUND	1100	1102	14.263505	121.126744	2	1400	1407
2589	Espie Jhoawel Enterprise	LOT 1 JUAN LUNA ST.	1300	1303	14.279578	121.125904	2	1400	1407
2590	Ccm Trading	BLK-53 LOT-17 P3	500	508	14.281300	121.135653	1	1500	1509
2591	Imr Ismaro Foods Corp. (Mang Inasal)	UNIT 1 CABUYAO RETAIL PLAZA	1400	1402	14.277210	121.123605	3	800	812
2592	Gf2 Construction	C/O NESTLE PHILIPPINES	1100	1103	14.262693	121.127511	2	200	204
2593	Minami Machineries And Equipment, Inc.	#307	200	216	14.242107	121.112393	3	1800	1812
2594	R And M Electrical Services	BLK6 LOT14 PH5	800	816	14.259973	121.153840	2	1400	1407
2595	Marc And Jenssen Industrial Corporation	ST. VINCENT COLLEGE COMPOUND	900	927	14.233674	121.148973	2	1400	1407
2596	Critomo Precision And Industrial Services		900	903	14.233646	121.149042	2	1100	1104
2597	Megatech Resources Corporation	NESTLE PHILS.	1100	1103	14.262646	121.127517	2	1100	1102
2598	Motorcentral Ncr Corporation		1600	1614	14.248339	121.129462	3	100	105
2599	Rs Marasigan Enterprises	9127	1700	1702	14.270316	121.130610	2	200	221
2600	Maximus Prime Logistic Services Inc.	BLK 10 LOT 15-17 SUBDIVISION PLAN PSU 17904	1600	1616	14.245278	121.124304	2	1700	1706
2601	Marco Lorenzo Hardware & Construction Supply	BLK111 LOT17&19	900	913	14.235092	121.153661	1	1500	1509
2602	Larryemm Enterprises ( Seven Eleven )	J.P. RIZAL ST.	1400	1404	14.277346	121.123341	1	1500	1502
2603	Nicolex Development Corporation		400	414	14.282237	121.126526	2	200	219
2604	Trucklane Moving Services	#9178 A	200	216	14.243249	121.113113	2	1700	1705
2605	Home Riser Building Solution		300	317	14.231402	121.138953	1	1500	1509
2606	Negros Women For Tomorrow Foundation, Inc. (A Microfinance Ngo)	#216	300	317	14.231384	121.138445	2	700	703
2607	Nebecor Corporation	(LIMCAOCO CPD)	1600	1617	14.242411	121.117079	2	1700	1711
2608	Gabriel Water Works Services (Gwws) Corp.	BLK25 LOT19	1800	1809	14.235613	121.122387	1	1500	1517
2609	Oil Ridge Inc.	#444 VH CPD.	200	217	14.253909	121.128557	1	100	106
2610	Office Basics Corporation	UNIT 5A LS SQUARE BLDG.	1700	1713	14.272544	121.121605	1	1500	1514
2611	To Haul Logistics Corporation		1600	1617	14.242493	121.111751	2	1700	1711
2612	Gpro Enterprise And Engineering Services	245	900	922	14.235438	121.158579	2	1400	1407
2613	Ohgitani Metal Inc.	#10 BINARY ST.	700	703	14.234992	121.097162	1	1100	1114
2614	Sueda Hauling Co.	BLK4 LOT7	1700	1711	14.272757	121.126480	2	1700	1705
2615	Mary Check Trading	MAMATID ROAD	300	313	14.232647	121.146620	3	1800	1810
2616	Rural Bank Of Canlubang Planters, Inc. (Planbank)	LOT 2B	1600	1614	14.280326	121.125236	2	700	702
2617	Cebuana Lhuillier Pawnshop - Cabuyao Branch	#259 J.P. RIZAL ST.	1300	1302	14.278000	121.123259	2	700	709
2618	Paatronix Technology Corp.	UNIT C GF RLI 3	200	216	14.242463	121.113466	1	1500	1503
2619	Pacifica Agrivet Supplies, Inc.		300	308	14.229059	121.138237	1	1500	1507
2620	Cebuana Lhuillier Pawnshop - Cabuyao - Katapatan Branch	#38	200	212	14.256438	121.128322	2	700	709
2621	Philippine Seven Corporation ( San Isidro )	# 35	1800	1822	14.237983	121.133407	1	1500	1502
2622	Pandayan Bookshop, Inc.	CENTROMALL	1600	1614	14.242608	121.131255	1	1500	1514
2623	Philippine Savings Bank	GF NEW BLDG. J.P. RIZAL ST. CORNER A. BONIFACIO ST.	1400	1401	14.277025	121.123698	2	700	702
2624	Philippine Seven Corporation (Baclaran)		100	103	14.243606	121.170269	1	1500	1502
2625	Philippine National Bank	124 G/F CENTRO MALL	1600	1614	14.242390	121.131296	2	700	702
2626	Prime Metroestate, Inc.	JP RIZAL CORNER A. BONIFACIO ST.	1400	1401	14.276682	121.123685	2	200	211
2627	Philippine Seven Corporation ( 7 - Eleven )	BLK1 LOT1	500	509	14.279692	121.136446	1	1500	1502
2628	Philippine Seven Corporation	BLK2 LOT1&2	1000	1012	14.579337	121.086212	1	1500	1502
2629	Philippine Seven Corporation		300	313	14.227960	121.138958	1	1500	1502
2630	Pangga Marketing & Trader Corporation		1600	1618	14.248862	121.132228	2	1700	1705
2631	Ph Global Jet Express Inc.	UNIT 2 GROUND FLOOR JAP LANDMARK #8 J.P. RIZAL ST.	1500	1503	14.275540	121.124118	2	1700	1702
2632	Rdc Construction & Dev`T. Corp.		1700	1722	14.272310	121.126939	2	200	203
2633	Rizal Commercial Banking Corp. (Rcbc)- Science Park Br.		700	703	14.237241	121.101895	2	700	702
2634	Royal 168 Services, Inc.		1600	1613	14.282941	121.125372	2	1400	1407
2635	South Star Drug, Inc.	J. P. RIZAL ST.	1400	1404	14.276944	121.123647	3	900	912
2636	Rejan Technology, Incorporated	OFFICE/WAREHOUSE BLK-3A LOT-1A	1600	1617	14.242797	121.117052	2	1100	1102
2637	Dbr Human Resource And Services	#230	1600	1619	14.241787	121.131948	2	1400	1407
2638	Rudanel Land Incorporated	BLK4 LOT2	200	216	14.241998	121.113141	2	200	211
2639	Laguna Lrci - Luzon Ram Cycles, Inc.	524	1100	1112	14.262684	121.126838	3	100	105
2640	R.B. Nery Builders Corp.	1-D-3-A & B BLK 2 WAREHOUSE 7 & 8	200	205	14.253687	121.128688	2	200	211
2641	S-9 Construction Supplies		1100	1103	14.265603	121.126940	1	1500	1509
2642	Lucky Heart Grocery	#17	900	931	14.234979	121.157874	1	1500	1507
2643	Baliwag Lechon Manok	J.P RIZAL ST.	1400	1404	14.276932	121.123641	1	1500	1504
2644	South Emerald Distribuition Inc. ( Banlic Branch )	GOLDEN HARVEST BLDG.	300	307	14.228718	121.139817	1	1500	1508
2645	Scopeworks Asia, Inc	BLDG. 1 LSL COMPOUND DIODE ST.	700	703	14.236577	121.100446	2	1000	1005
2646	Twis Trading	#23 ROSAS ST.	1700	1703	14.270692	121.124826	1	1500	1507
2647	Speedsonic Inc.	LAUGUICO BLDG. J.P. RIZAL ST.	1500	1503	14.275765	121.124098	3	100	105
2648	Santa Ana Properties, Incorporated	#7 FUSION ST.	700	703	14.236090	121.103604	2	200	212
2649	S.B. Hain Enterprises & General Services Inc.		1100	1104	14.262003	121.134095	2	1700	1705
2650	Twins Grocery	#77	1800	1822	14.242016	121.142261	1	1500	1508
2651	Zhen Sherwin Memorial Chapel		1600	1622	14.244615	121.121541	2	1200	1203
2652	Supremo Risk Management Company, Inc.	BLK13 LOT8 PHASE 1	300	302	14.227965	121.137504	2	1400	1406
2653	Jem Bev Enterprises	#175 J.P. RIZAL ST.	1300	1301	14.276791	121.123569	3	1800	1807
2654	St. Peter Chapels Luzon, Inc.	PASTURE OF HEAVEN	1700	1713	14.272858	121.121776	2	1200	1203
2655	Spd Jobs, Inc.	2/F CENTENNIAL BUSINESS CENTER	1600	1622	14.246192	121.129544	2	1400	1407
2656	Vds Hardware		1600	1614	14.248209	121.129487	1	1500	1509
2657	Shakey`S Pizza Asia Ventures Inc.	CALTEX STA. ELENA	1600	1617	14.242407	121.116483	3	800	812
2658	Trans Asia Wood, Inc.		1600	1617	14.240151	121.103389	1	1100	1113
2659	T. Biraogo Trucking Services, Inc.	#9088	1700	1702	14.273585	121.129308	2	1700	1711
2660	Tiong Woon Philippines, Inc.		1600	1617	14.242116	121.116781	2	200	203
2661	Rikka And Lita Meat Stall		1400	1402	14.277530	121.123817	1	1500	1504
2662	Triple D Trading & Fabrication	#99	200	212	14.256460	121.128062	2	1100	1111
2663	Tabuko Energy Network Corp.	#049	500	501	14.290445	121.132701	2	1400	1407
2664	The D.I.Y. (Do It Yourself) Shop Corp.	M.H. DEL PILAR ST	1400	1405	14.276645	121.125446	1	1500	1509
2665	Triple J Savers Mart Co.	#119	200	212	14.256068	121.128369	1	1500	1502
2666	Trans-Ocean Container Service Phils. Inc.		1600	1617	14.242195	121.116383	2	1700	1713
2667	Beinte Quatro Mini Mart And Cabuyao Fitness Gym	BLK1 LOT34-35	200	210	14.256057	121.128619	1	1500	1502
2668	Hased Generics Pharmacy Inc.	J.P. RIZAL ST.	1400	1404	14.276682	121.123701	3	900	912
2669	Urban Denim Makers, Inc.	WALTERMART CABUYAO KM. 47	300	311	14.232300	121.133349	1	1500	1507
2670	R.A.M. Fuel Station		1600	1614	14.238210	121.132302	3	100	104
2671	Pf Velasco Pharmacy/Medical Clinic	#50	200	212	14.255449	121.128276	3	900	913
2672	Rv Pallet Enterprises	#200	400	414	14.291934	121.128563	1	1100	1113
2673	Account Master Global Solution	UNIT 408 THE CENTRALE BLDG.	200	216	14.241921	121.112634	2	1400	1401
2674	Jon-Vhie Convenience Store	#258	900	907	14.234954	121.154660	3	1500	1502
2675	Wonderzyme, Inc.	INFARMCO	1800	1822	14.238309	121.135235	1	1100	1110
2676	Wallmac Corporation	#149 J.P. RIZAL ST.	1700	1708	14.268047	121.127028	2	200	211
2677	Waste & Resources Management, Inc.	EAST ROAD 1 GATE 3	700	703	14.232344	121.092337	2	1400	1407
2678	Wowa`S Fast Foods Inc.	INTERPHIL LABORATORIES CANLUBANG INDUSTRIAL ESTATE	1200	1205	14.225128	121.078036	3	800	802
2679	Golden Kimstar Hardware		200	212	14.251156	121.128709	1	1500	1509
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (category_id, category_name) FROM stdin;
100	Automotive Services
200	Construction and Real Estate
300	Cooperative Business
400	Creative and Media Service
500	Education Services
600	Entertainment and Recreation
700	Finance and Insurance
800	Food Services
900	Healthcare Services
1000	IT and Digital Services
1100	Manufacturing and Production
1200	Personal and Household Services
1300	Personal Care Services
1400	Professional Services
1500	Retail Stores
1600	Tourism and Hospitality
1700	Transportation and Logistics
1800	Wholesale and Distribution
\.


--
-- Data for Name: smetype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.smetype (smetype_id, smetype_name) FROM stdin;
1	Product
2	Services
3	Product and Services
\.


--
-- Data for Name: subarea; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subarea (subarea_id, subarea_name, barangay_id) FROM stdin;
101	Crystal Ville	100
102	Mabuhay City	100
103	PH 1 Mabuhay City	100
104	Purok 3	100
105	Villa Estella Subdivision	100
106	Blanks	100
201	Bamboo Orchard	200
202	Corner Road 1	200
203	Del Rosario Compound	200
204	Don Onofre Village	200
205	Gatchalian Subdivision	200
206	Gatchalian Industrial Estate	200
207	Grand Acacia Grove	200
208	Greenleaf Residences	200
209	Hongkong Village	200
210	Katapatan Homes	200
211	Lakeside Nest Subdivision	200
212	National Highway	200
213	NIA Road	200
214	San Carlos Village	200
215	Southville 1	200
216	Southpoint Subdivision	200
217	Blanks	200
301	Alimagno Compound	300
302	Camella Homes	300
303	Camella Homes Bermuda	300
304	Dona Ines Compound	300
305	Felicias Compound	300
306	Gran Seville	300
307	Mamatid Road	300
308	National Highway	300
309	Palmsville Subdivision	300
310	Prince Village	300
311	Purok 1	300
312	Purok 2	300
313	Purok 3	300
314	Purok 4	300
315	San Isidro Heights	300
316	Tamis Compounds	300
317	Blanks	300
401	Bella Solana	400
402	Bigaa Road	400
403	Egaland	400
404	Major Homes Subdivision	400
405	Marinig Road	400
406	Purok 1	400
407	Purok 2	400
408	Purok 3	400
409	Purok 4	400
410	Purok 5	400
411	Purok 6	400
412	Stoneridge Ville	400
413	Tierra Elsol Subdivision	400
414	Blanks	400
501	Purok 1	500
502	Purok 2	500
503	Purok 3	500
504	Purok 4	500
505	Purok 5	500
506	Purok 6	500
507	St. Joseph Village 4	500
508	St. Joseph Village 6	500
509	St. Joseph Village 8	500
510	Blanks	500
601	Purok 1	600
602	Purok 3	600
603	Purok 4	600
604	Purok 5	600
605	Purok 6	600
606	Purok Tagaytay Cabuyao	600
607	Blanks	600
701	Diezmo Road	700
702	East Road	700
703	LISP 1	700
704	St. Felix Ville	700
801	Cavitehan Road	800
802	Celestine Ville	800
803	Centerra	800
804	New Mahogany Village 3	800
805	NIA Road	800
806	Purok 1	800
807	Purok 2	800
808	Purok 3	800
809	Purok 4	800
810	Purok 5	800
811	Purok 6	800
812	Purok 7	800
813	St. Joseph Homes 1	800
814	St. Joseph Homes 2	800
815	St. Joseph Village 2	800
816	St. Joseph Village 7	800
817	St. Joseph Windfield 2	800
818	Blanks	800
901	Brillianz Residences	900
902	Buena Rosario	900
903	Ciudad Montrina	900
904	Extraordinary Homes Executive	900
905	Extraordinary Homes Mabuhay	900
906	Luxury Mabuhay City	900
907	Mabuhay City	900
908	Main Road	900
909	Mamatid Road	900
910	Montrina Subdivision	900
911	NIA Road	900
912	Phase 1 Mabuhay	900
913	Phase 2 Mabuhay	900
914	Phase 3 Mabuhay	900
915	Phase 3 Cluster Mabuhay	900
916	Phase 3 Executive Mabuhay	900
917	Phase 3 Extension Mabuhay	900
918	Phase 4 Mabuhay	900
919	Phase 5 Mabuhay	900
920	Phase 6 Mabuhay	900
921	Phase 7 Mabuhay	900
922	Purok 1	900
923	Purok 2	900
924	Purok 3	900
925	Purok 4	900
926	St. Joseph Village 3	900
927	St. Vincent Compound	900
928	Value Homes 1	900
929	Value Homes 2	900
930	Value Homes 3	900
931	Blanks	900
1001	Celestine Homes	1000
1002	Lakeside Nest Subdivision	1000
1003	Lynville Residences	1000
1004	Maripaz Ville	1000
1005	Purok 1	1000
1006	Purok 2	1000
1007	Purok 3	1000
1008	Purok 4	1000
1009	Purok 5	1000
1010	Purok 6	1000
1011	Southville 1	1000
1012	St. Joesph Village 7	1000
1013	Subrise Subdivision	1000
1014	Blanks	1000
1101	Console Village	1100
1102	Hemedez Compound	1100
1103	National Highway	1100
1104	NIA Road	1100
1105	Purok 3	1100
1106	Regatta South Executive Homes	1100
1107	Riverside Road	1100
1108	San Antonio	1100
1109	SB Hain Compound	1100
1110	Southville 1	1100
1111	St. Francis Homes 6	1100
1112	Blanks	1100
1201	Camella La Vecina Dos Rios	1200
1202	Hana Garden Villas	1200
1203	Inc Compound	1200
1204	Tereley Industrial Park	1200
1205	Blanks	1200
1301	Bermudez Compound	1300
1302	JP Rizal St.	1300
1303	Juan Luna St.	1300
1304	Limacaoco St.	1300
1305	Mabini St.	1300
1306	Malvar St.	1300
1307	ML Quezon St	1300
1308	P Burgos St.	1300
1309	Vanessa Compound	1300
1310	Osmena St.	1300
1311	Blanks	1300
1401	A. Bonifacion St.	1400
1402	Cabuyao Retail Plaza	1400
1403	El Sol Plaza	1400
1404	JP Rizal St.	1400
1405	MH Del Pilar St. 	1400
1406	ML Quezon St.	1400
1407	National Highway	1400
1408	Osmena St.	1400
1501	Cemetery Road	1500
1502	Elsol Subdivision	1500
1503	JP Rizal St. 	1500
1504	Limcaoco Subdivision	1500
1505	Osmena St.	1500
1506	Sto. Nino Executive Homes	1500
1507	Blanks	1500
1601	Arabella Homes	1600
1602	Bimingham Village	1600
1603	Cabuyao Centrale	1600
1604	Cenntenial Town Homes 2	1600
1605	Diezmo Road	1600
1606	Divimall	1600
1607	Don Vicente Village	1600
1608	Eastland 2	1600
1609	Fortezza Sudivision	1600
1610	Evergreen Subdivision	1600
1611	Mahogany Promenade	1600
1612	Mahogany Village Ph 1	1600
1613	Millwood Ville	1600
1614	National Highway	1600
1615	NIA Road	1600
1616	Paseo de Cabuyao	1600
1617	Pulo-Diezmo Road	1600
1618	Pulo-San Isidro Road	1600
1619	Realica	1600
1620	Villa Adelinia 2	1600
1621	Willow Park Homes	1600
1622	Blanks	1600
1701	Asia Brewery Compound	1700
1702	Bagong Silang	1700
1703	Bella Subdivision	1700
1704	Casa Esperanza	1700
1705	Don Onofre Building 2	1700
1706	PFB Bailon St.	1700
1707	Florence Homes	1700
1708	JP Rizal St.	1700
1709	La Bella Homes	1700
1710	Marinig Road	1700
1711	Mercedez Village	1700
1712	Multiland III	1700
1713	National Highway	1700
1714	Nevalga Farm Drive	1700
1715	NIA Road	1700
1716	Purok 1	1700
1717	Purok 2	1700
1718	Purok 4	1700
1719	Purok 5	1700
1720	Rosario Village	1700
1721	Rotonda	1700
1722	Shineland	1700
1723	Blanks	1700
1801	Canaan Homes	1800
1802	Centennial Plaza	1800
1803	Centennial Town Homes	1800
1804	Emmanual SJB Complex	1800
1805	Fortezza Subdivision	1800
1806	IFL Compound	1800
1807	Manila South Road	1800
1808	National Highway	1800
1809	New Mahogany Village 3	1800
1810	NIA Road	1800
1811	Our Mahogany Village 2	1800
1812	Purok 1	1800
1813	Purok 2	1800
1814	Purok 4	1800
1815	Purok 5	1800
1816	San Isidro Heights	1800
1817	San Isidro Homes	1800
1818	San Isidro Road	1800
1819	St. Isidore Executive Village	1800
1820	Tierra Allegra	1800
1821	Vanessa Homes	1800
1822	Blanks	1800
\.


--
-- Data for Name: subcategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subcategory (subcategory_id, subcategory_name, parent_category_id) FROM stdin;
101	Auto Repair Services	100
102	Body and Welding Shops	100
103	Car Wash and Detailing	100
104	Fuel Services	100
105	Motorcycle Dealer	100
106	Specialized Automotive Services	100
107	Vulcanizing Services	100
201	Apartment/Apartelle	200
202	Building Contractor	200
203	Construction Services	200
204	Contractor	200
205	Electrical/Mechanical Contractor	200
206	Facilities and Infrastructure	200
207	General Construction	200
208	General Contractor	200
209	General Engineering Contractor	200
210	Heavy Equipment Rental	200
211	Lessor (Commercial Space)	200
212	Lessor (Excluding Subd. Operators/Lessors)	200
213	Lessor (Industrial Space)	200
214	Lessor (Residential)	200
215	Lot Rental	200
216	Memorial Park	200
217	Property Rental and Management	200
218	Real Estate Developer	200
219	Realty	200
220	Realty Broker	200
221	Service Contractor	200
222	Warehousing	200
301	Cooperative	300
401	Advertising and Marketing	400
402	Event Design Service	400
403	Photography and Videography	400
404	Printing Services	400
501	Driving School	500
502	Learning Center	500
503	Private School	500
504	School Service	500
505	Training Center	500
506	Tutorial Services	500
507	Vocational and Special Schools	500
601	Dining and Leisure	600
602	Egames/Ebingo	600
603	Fireworks and Pyrotechnics	600
604	Golf Cart Rental	600
605	Party Rentals	600
606	Play Center	600
607	Sound & Light Rental	600
608	Sports and Fitness	600
701	ATM Off Site Stations	700
702	Banks	700
703	Financing Institutions	700
704	General Financial Services	700
705	Holding Company	700
706	Insurance Agents/Companies	700
707	Lending Investor	700
708	Money Remittance / Bills Payment	700
709	Pawnshop & Financial Services	700
710	Payment Center	700
801	Burger Stand	800
802	Canteen	800
803	Catering Service	800
804	Coffee Shop	800
805	Eatery	800
806	Fast Food	800
807	Food Concessionaire	800
808	Food Stand	800
809	Milk Tea Shop	800
810	Panciteria	800
811	Refreshment Parlor	800
812	Restaurant	800
813	Restobar	800
901	Animal Bite Clinics	900
902	Dental Clinics	900
903	Diagnostic and Medical Clinics	900
904	Dialysis Center	900
905	Gerontology Services	900
906	Hospital	900
907	Laboratory Equipment Repair Service	900
908	Maternity Clinics & Family Planning	900
909	Medical Clinics	900
910	Medical and Healthcare Services	900
911	Optical Clinics	900
912	Pharmacies	900
913	Pharmacy & Medical Clinics	900
914	Rehabilitation Centers	900
915	Service Contractor	900
916	Therapy Centers	900
917	Veterinary Clinics	900
1001	Administrative Support Services	1000
1002	Audio & Video System Services	1000
1003	Computer Services / IT Services	1000
1004	Computer Shop	1000
1005	Customer Support & BPO Service	1000
1006	Internet Service Provider	1000
1007	Repair Services	1000
1008	Service Contractor	1000
1009	Telecom Services	1000
1010	Virtual Assistance	1000
1101	Agricultural Products	1100
1102	Contractor and Service Manufacturing	1100
1103	Essential Manufacturer	1100
1104	Fabrication Services	1100
1105	Food Products Manufacturer	1100
1106	Garment Manufacturer	1100
1107	General Manufacturing	1100
1108	Glass & Aluminum Fabrication Services	1100
1109	Hollowblock Making	1100
1110	Industrial Equipment Services	1100
1111	Machine Fabrication and Shop	1100
1112	Metal Fabrication	1100
1113	Non-Essential Manufacturer	1100
1114	PEZA Registered Business	1100
1115	Plastic Products Manufacturer	1100
1116	Specialty Manufacturing	1100
1117	Woodcraft	1100
1201	Air-Conditioner Services	1200
1202	Bottle-Cleaning	1200
1203	Funeral Services	1200
1204	Furniture & Carpentry	1200
1205	Gown/Barong/Dress/Toga Rental	1200
1206	Janitorial Services	1200
1207	Kitchen Equipment Repair Services	1200
1208	Laundry Shops	1200
1209	Pest Control	1200
1210	Plumbing Services	1200
1211	Refrigerator & Air-Con Repair Services	1200
1212	Service Contractor	1200
1213	Tailor and Dress Shop	1200
1214	Upholstery and Repair Shop	1200
1301	Aesthetic Services	1300
1302	Barbershop	1300
1303	Beauty Parlor	1300
1304	Fitness Gym	1300
1305	Home Massage Services	1300
1306	Nail Spa	1300
1307	Skin Care Center	1300
1401	Accounting Agencies	1400
1402	Administrative Office Services	1400
1403	Administrative Support Services	1400
1404	Business Agent	1400
1405	Calibration Services	1400
1406	Consultancy and Management Services	1400
1407	Contracting and Manpower Services	1400
1408	Design Services	1400
1409	Emission Testing Center	1400
1410	Engineering and Technical Services	1400
1411	Organizations	1400
1412	Referral Service	1400
1413	Repair and Maintenance Services	1400
1414	Security Agency	1400
1415	Water Treatment and Testing Services	1400
1501	Clothing and Apparel	1500
1502	Convenience Stores	1500
1503	Electronics and Gadgets	1500
1504	Food and Beverage	1500
1505	Fuel and Energy Supplies	1500
1506	Furniture and Home Decor	1500
1507	General Merchandise	1500
1508	Grocery and Supermarkets	1500
1509	Hardware and Construction Supplies	1500
1510	Health and Personal Care	1500
1511	Household Supplies	1500
1512	Online Shops	1500
1513	Sari-Sari Store	1500
1514	School and Office Supplies	1500
1515	Specialty Stores	1500
1516	Vehicle and Parts Supplies	1500
1517	Water Supply	1500
1601	Hotel	1600
1602	Resort	1600
1603	Travel Agency	1600
1701	Car Rental	1700
1702	Common Courier	1700
1703	Delivery Services	1700
1704	Forwarder	1700
1705	Hauling Services	1700
1706	Logistics Services	1700
1707	Operators & Drivers Association	1700
1708	Service Contractor	1700
1709	Shuttle Services / Transport Services	1700
1710	Transport Services	1700
1711	Trucking / Transport Services	1700
1712	Vehicle Storage	1700
1713	Warehouse and Storage Services	1700
1801	Agricultural Products	1800
1802	Auction	1800
1803	Automotive	1800
1804	Cleaning Supplies	1800
1805	Electronics Products	1800
1806	Essential / Non Essential	1800
1807	Food Products	1800
1808	Fuel and Energy Supplies	1800
1809	Industrial and Construction Supplies	1800
1810	Junk Shops	1800
1811	Medical and Health Supplies	1800
1812	Non Essential	1800
1813	Office & Packaging Supplies	1800
1814	Recycle Materials	1800
1815	Service Contractor	1800
1816	Trading	1800
\.


--
-- Name: barangay_barangay_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.barangay_barangay_id_seq', 1, false);


--
-- Name: business_business_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.business_business_id_seq', 1, false);


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_category_id_seq', 1, false);


--
-- Name: smetype_smetype_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.smetype_smetype_id_seq', 1, false);


--
-- Name: subarea_subarea_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subarea_subarea_id_seq', 1, false);


--
-- Name: subcategory_subcategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subcategory_subcategory_id_seq', 1, false);


--
-- Name: barangay barangay_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.barangay
    ADD CONSTRAINT barangay_pkey PRIMARY KEY (barangay_id);


--
-- Name: business business_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_pkey PRIMARY KEY (business_id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: smetype smetype_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.smetype
    ADD CONSTRAINT smetype_pkey PRIMARY KEY (smetype_id);


--
-- Name: subarea subarea_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subarea
    ADD CONSTRAINT subarea_pkey PRIMARY KEY (subarea_id);


--
-- Name: subcategory subcategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategory
    ADD CONSTRAINT subcategory_pkey PRIMARY KEY (subcategory_id);


--
-- Name: business business_barangay_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_barangay_id_fkey FOREIGN KEY (barangay_id) REFERENCES public.barangay(barangay_id) ON DELETE CASCADE;


--
-- Name: business business_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id) ON DELETE CASCADE;


--
-- Name: business business_smetype_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_smetype_id_fkey FOREIGN KEY (smetype_id) REFERENCES public.smetype(smetype_id) ON DELETE CASCADE;


--
-- Name: business business_subarea_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_subarea_id_fkey FOREIGN KEY (subarea_id) REFERENCES public.subarea(subarea_id) ON DELETE CASCADE;


--
-- Name: business business_subcategory_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.business
    ADD CONSTRAINT business_subcategory_id_fkey FOREIGN KEY (subcategory_id) REFERENCES public.subcategory(subcategory_id);


--
-- Name: subarea subarea_barangay_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subarea
    ADD CONSTRAINT subarea_barangay_id_fkey FOREIGN KEY (barangay_id) REFERENCES public.barangay(barangay_id) ON DELETE CASCADE;


--
-- Name: subcategory subcategory_parent_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subcategory
    ADD CONSTRAINT subcategory_parent_category_id_fkey FOREIGN KEY (parent_category_id) REFERENCES public.category(category_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

