import * as migration_20260929_195603_initial from './20260929_195603_initial';

export const migrations = [
  {
    up: migration_20260929_195603_initial.up,
    down: migration_20260929_195603_initial.down,
    name: '20260929_195603_initial'
  },
];
