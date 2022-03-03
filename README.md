<h1 align="center">
  Donations
</h1>

<p align="center">
  Collect donations easily. This is a static website built with Gatsby. Takes advantage of a few <a href="https://www.gatsbyjs.com/products/cloud/functions">Gatsby Cloud Functions</a> to provision payments.
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
- SIPAY ([Sipay](https://sipay.com.tr))

Note: Use only TypeScript files. JS files are temporary and built from TypeScript sources. Any change here should be built with `npm run build-pp`.

### 🚀 Deploy to Gatsby Cloud

Deploy this project on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/):

[<img src="https://www.gatsbyjs.com/deploynow.svg" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/dbtek/donations)

**Environment Variables**

When deploying to Gatsby Cloud, you need to add appropriate environment variables. Please see `.env.sample` file for examples.

