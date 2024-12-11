ALTER TABLE Business
ALTER COLUMN business_id SET DEFAULT nextval('business_business_id_seq');

SELECT setval('business_business_id_seq', (SELECT MAX(business_id) FROM Business));
