DO $$ 
DECLARE
    table_name text;
BEGIN
    -- Disable triggers
    EXECUTE 'SET session_replication_role = replica';

    -- Loop through all tables
    FOR table_name IN
        SELECT tablename FROM pg_tables
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'TRUNCATE TABLE ' || quote_ident(table_name) || ' CASCADE';
    END LOOP;

    -- Enable triggers
    EXECUTE 'SET session_replication_role = DEFAULT';
END $$;
