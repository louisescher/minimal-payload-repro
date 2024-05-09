# minimal-payload-repro
A repo showcasing a JSON upload issue with Payload.

## To reproduce
1. Clone the repo
2. Run `docker compose up`
3. Create a new account in the local payload instance
4. Head to `http://localhost:3000/admin/globals/bulk-upload`
5. Try to upload any image (or any file) larger than 1MB (Errors out)
6. Head to `http://localhost:3000/admin/collections/media`
7. Upload the same image (or file), the error will not occur