
start_db:
	pg_ctl -D /usr/local/var/postgres start

stop_db:
	pg_ctl -D /usr/local/var/postgres stop