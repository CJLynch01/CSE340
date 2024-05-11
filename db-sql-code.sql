CREATE TYPE public.sample AS ENUM
    ('Client', 'Employee', 'Admin');

ALTER TYPE public.sample
    OWNER TO cse340;