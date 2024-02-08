<h1 align="center">
  Donations
</h1>

<p align="center">
  Collect donations easily. This is a static website built with Gatsby. Takes advantage of a few serverless functions to provision payments.
</p>

---

## Development

1.  **Install dependencies.**

    ```shell
    npm i
    ```

3. **Build payment providers**
   
   ```shell
   npm run build-pp
   ```

4.  **Start development**

    ```shell
    npm run develop
    ```
    Your site is now running at http://localhost:8000!

### Payment Providers

One can add new providers by copying existing one.

Currently supported providers:
- TF (Turkiye Finans), placed at `/src/payment-providers/tf.ts`.

Note: Use only TypeScript files. JS files are temporary and built from TypeScript sources. Any change here should be built with `npm run build-pp`.

### 🚀 Deploy to Netlify

Click to deploy this project on [Netlify](https://netlify.com).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dbtek/donations)