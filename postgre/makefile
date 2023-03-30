DB=timeclock
CREATE_DB=${CURDIR}/create_db.sql
BUILD=${CURDIR}/build.sql
EXAMPLE_DATA=${CURDIR}/dummy_data.sql
REF_DATA=${CURDIR}/ref_data.sql
DESCRIBE=${CURDIR}/describe.sql

all: ref_data 
	psql $(DB) -f $(EXAMPLE_DATA);

ref_data: build 
	psql $(DB) -f $(REF_DATA);

build: create
	psql $(DB) -f $(BUILD)

create:
	psql -f $(CREATE_DB)

describe:
	psql $(DB) -f $(DESCRIBE)
