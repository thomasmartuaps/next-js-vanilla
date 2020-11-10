CREATE TABLE IF NOT EXISTS "public"."User" (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    passwords VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."Profile"(
  id SERIAL PRIMARY KEY NOT NULL,
  handphone VARCHAR(255) NOT NULL,
  alamat VARCHAR(255) NOT NULL,
  avatar VARCHAR(255) NOT NULL,
  userId INT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(userId)
      REFERENCES "public"."User"(id)
        ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "public"."Content"(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  descriptions VARCHAR(255),
  author INT NOT NULL,
  eventDate DATE,
  publishDate DATE NOT NULL DEFAULT CURRENT_DATE,
  contentPhoto VARCHAR(255),
  contentVideo VARCHAR(255),
  CONSTRAINT authorID
    FOREIGN KEY(author)
      REFERENCES "public"."User"(id)
        ON DELETE SET NULL

);