--
-- PostgreSQL database dump
--

-- Dumped from database version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)
-- Dumped by pg_dump version 12.17 (Ubuntu 12.17-1.pgdg22.04+1)

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

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

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
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    asteroid_id integer NOT NULL,
    name character varying(150) NOT NULL,
    diameter_in_km integer,
    orbital_period numeric,
    is_moon boolean
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.asteroid_asteroid_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asteroid_asteroid_id_seq OWNER TO freecodecamp;

--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.asteroid_asteroid_id_seq OWNED BY public.asteroid.asteroid_id;


--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(150) NOT NULL,
    mass numeric(20,5),
    is_visible_to_naked_eye boolean,
    discovery_year integer
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(150) NOT NULL,
    num_of_craters integer,
    has_atmosphere boolean,
    planet_id integer NOT NULL
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(150) NOT NULL,
    supports_life boolean,
    num_of_moons integer,
    description text,
    star_id integer NOT NULL
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(150) NOT NULL,
    age_in_millions integer,
    spectral_type character varying(10),
    galaxy_id integer NOT NULL
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: asteroid asteroid_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid ALTER COLUMN asteroid_id SET DEFAULT nextval('public.asteroid_asteroid_id_seq'::regclass);


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid VALUES (1, 'Ceres', 940, 4.60, false);
INSERT INTO public.asteroid VALUES (2, 'Vesta', 525, 3.63, false);
INSERT INTO public.asteroid VALUES (3, 'Pallas', 512, 4.62, false);
INSERT INTO public.asteroid VALUES (4, 'Vestoids', 240, 5.26, false);
INSERT INTO public.asteroid VALUES (5, 'Eros', 34, 1.76, false);


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 1500000000000.00000, true, NULL);
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 1200000000000.00000, true, 964);
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 50000000000.00000, false, 1654);
INSERT INTO public.galaxy VALUES (4, 'Messier 87', 6300000000000.00000, false, 1781);
INSERT INTO public.galaxy VALUES (5, 'Whirlpool', 150000000000.00000, true, 1773);
INSERT INTO public.galaxy VALUES (6, 'Sombrero', 810000000000.00000, false, 1781);


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Moon (Earth)', 300000, false, 1);
INSERT INTO public.moon VALUES (2, 'Phobos', 1000, false, 2);
INSERT INTO public.moon VALUES (3, 'Deimos', 200, false, 2);
INSERT INTO public.moon VALUES (4, 'Ganymede', 20000, false, 4);
INSERT INTO public.moon VALUES (5, 'Callisto', 50000, false, 4);
INSERT INTO public.moon VALUES (6, 'Io', 400, false, 4);
INSERT INTO public.moon VALUES (7, 'Europa', 1000, false, 4);
INSERT INTO public.moon VALUES (8, 'Titan', 10000, true, 5);
INSERT INTO public.moon VALUES (10, 'Enceladus', 10000, false, 5);
INSERT INTO public.moon VALUES (11, 'Rhea', 5000, false, 5);
INSERT INTO public.moon VALUES (12, 'Iapetus', 10000, false, 5);
INSERT INTO public.moon VALUES (16, 'Tethys', 5000, false, 5);
INSERT INTO public.moon VALUES (18, 'Mimas', 1000, false, 5);
INSERT INTO public.moon VALUES (19, 'Hyperion', 500, false, 5);
INSERT INTO public.moon VALUES (9, 'Triton', 10000, true, 6);
INSERT INTO public.moon VALUES (13, 'Miranda', 1000, false, 8);
INSERT INTO public.moon VALUES (14, 'Ariel', 2000, false, 8);
INSERT INTO public.moon VALUES (15, 'Umbriel', 1500, false, 8);
INSERT INTO public.moon VALUES (21, 'Oberon', 2000, false, 8);
INSERT INTO public.moon VALUES (17, 'Charon', 3000, false, 6);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Earth', true, 1, 'The only known planet to support life, covered with vast oceans and diverse ecosystems', 1);
INSERT INTO public.planet VALUES (2, 'Mars', false, 2, 'A cold, desert-like planet with the tallest volcano and the deepest canyon in the solar system.', 1);
INSERT INTO public.planet VALUES (3, 'Venus', false, 0, 'A scorching world with a thick, toxic atmosphere and the hottest surface temperatures.', 1);
INSERT INTO public.planet VALUES (4, 'Jupiter', false, 79, 'The largest planet, a gas giant with a Great Red Spot and at least 79 known moons.', 1);
INSERT INTO public.planet VALUES (5, 'Saturn', false, 82, 'A gas giant famous for its stunning ring system, composed of ice and rock particles.', 1);
INSERT INTO public.planet VALUES (6, 'Neptune', false, 14, 'A blue ice giant with the fastest winds in the solar system, reaching 2,100 km/h.', 1);
INSERT INTO public.planet VALUES (7, 'Mercury', false, 0, 'The smallest planet, closest to the Sun, with extreme temperature variations.', 1);
INSERT INTO public.planet VALUES (8, 'Uranus', false, 27, 'An ice giant that rotates on its side, giving it unique seasonal variations.', 1);
INSERT INTO public.planet VALUES (11, 'Titan', false, 0, 'Saturn''s largest moon, with a thick atmosphere and liquid methane lakes.', 1);
INSERT INTO public.planet VALUES (9, 'Kepler-452b', true, 0, 'A potentially habitable exoplanet, often called Earth''s cousin.', 2);
INSERT INTO public.planet VALUES (10, 'Proxima b', false, 0, 'A rocky exoplanet orbiting the closest known star to the Sun, Proxima Centauri.', 5);
INSERT INTO public.planet VALUES (12, 'Gliese 581g', true, 0, 'A possible Earth-like exoplanet in the habitable zone of its star.', 3);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Sun', 4600, 'G2V', 1);
INSERT INTO public.star VALUES (2, 'Alpha Centauri A', 5800, 'G2V', 1);
INSERT INTO public.star VALUES (3, 'Sirius A', 200, 'A1V', 1);
INSERT INTO public.star VALUES (4, 'Betelgeuse', 80000, 'M1lab', 1);
INSERT INTO public.star VALUES (5, 'Proxima Centauri', 4500, 'M5.5Vc', 1);
INSERT INTO public.star VALUES (6, 'Rigel', 80000, 'B8la', 1);


--
-- Name: asteroid_asteroid_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.asteroid_asteroid_id_seq', 5, true);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 6, true);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 21, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 12, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: asteroid asteroid_name_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_name_key UNIQUE (name);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_galaxy_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_galaxy_name UNIQUE (name);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_galaxy_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_galaxy_name UNIQUE (name);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_galaxy_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_name UNIQUE (name);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: galaxy unique_galaxy_name; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT unique_galaxy_name UNIQUE (name);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

