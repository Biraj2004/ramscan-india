<div align="center">
  <table width="100%">
    <tr>
      <td align="center" style="border: none;">
        <br />
        <img src="public/logo.svg" width="128" height="128" alt="RAMScan India Logo" />
        <br />
        <h1>RAMScan India</h1>
        <p><i>The Premium Hardware Discovery Engine for the Indian Market</i></p>
        <p>
          <a href="https://ramscan-india.vercel.app"><b>Launch Live App</b></a> •
          <a href="#installation-and-deployment">Installation</a> •
          <a href="#license">MIT License</a>
        </p>
        <p>
          <img src="https://img.shields.io/badge/VENDORS-8+-ff5d22?style=for-the-badge" />
          <img src="https://img.shields.io/badge/COMPONENTS-RAM%20%2F%20SSD-black?style=for-the-badge" />
          <img src="https://img.shields.io/badge/DESIGN-INDUSTRIAL%20EDITORIAL-ff5d22?style=for-the-badge" />
        </p>
      </td>
    </tr>
  </table>
</div>

---

RAMScan India is a professional-grade price aggregation and discovery platform specifically engineered for the high-performance computing market in India. It specializes in real-time tracking of RAM and SSD components across multiple major Indian e-commerce vendors, delivering a technical and efficient user experience.

<div align="center">
  <table width="100%">
    <tr>
      <td align="center" style="border: none;">
        <h3>Technology Stack</h3>
        <p>
          <img src="https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB" />
          <img src="https://img.shields.io/badge/TypeScript-007acc?style=for-the-badge&logo=typescript&logoColor=white" />
          <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
          <img src="https://img.shields.io/badge/Lucide-ff5d22?style=for-the-badge&logo=lucide&logoColor=white" />
        </p>
      </td>
    </tr>
  </table>
</div>

## Core Features

### Market Scan Engine
The platform implements a sophisticated market scanning algorithm that simulates real-time price discovery across a curated list of trusted Indian vendors. When a user initiates a scan, the system sequentially queries vendor endpoints (simulated), applying a deliberate delay to ensure platform stability and respect vendor rate limits.

### Integrated Comparison System
The comparison engine allows users to perform deep side-by-side analysis of hardware specifications.
- **Price Delta Tracking**: Every price update is tracked against the previous scan, displaying real-time fluctuations (INR drops or increases).
- **History Visualization**: A multi-point price history module provides context on pricing trends for specific components.
- **Compare Shelf**: A dedicated staging area allows users to hold up to 3 components for direct technical comparison.

### Advanced Search and Filtering
The filtering system is designed for power users who know exactly what they are looking for.
- **Regex Search Support**: The search bar accepts regular expressions, allowing for complex queries like `Samsung|Crucial|Gen4` or `(DDR5|DDR4).*6000MHz`.
- **Hardware-Specific Breakdowns**: Filters are context-aware, shifting between DDR versions for RAM and Interface types (SATA, PCIe Gen4, etc.) for SSDs.
- **Capacity Normalization**: Automatically groups and normalizes varied capacity formats (e.g., 1024GB to 1TB) for consistent filtering.

### Rate Limiting and Performance
To maintain integrity and high performance, the application implements a multi-layer local security strategy.
- **Scanning Window**: Users are limited to 3 full market scans per 15-minute window to prevent automated abuse.
- **Cache Persistence**: Scanned results are cached in the browser's LocalStorage with a 10-minute expiry, ensuring instant loading on return visits while keeping data fresh.

---

## Design System: Industrial Editorial

RAMScan India utilizes a custom-built design system focused on high-contrast legibility and technical premium feel.

- **Color Architecture**: Built on a deep charcoal base (#0a0a0b) with saffron (#ff5d22) as the primary functional accent.
- **Typography**: Paired DM Serif Display for headers (editorial weight) with JetBrains Mono for data points (technical precision).
- **Spatial UI**: Employs glassmorphism and elevated paneling to create a clear visual hierarchy without the need for traditional e-commerce clutter.

---

## Technical Stack

The application is built using a modern, type-safe frontend stack:
- **React 18**: Leveraging the latest concurrent features and hook patterns.
- **TypeScript**: Ensuring end-to-end type safety for complex hardware spec interfaces.
- **Vite**: Providing an ultra-fast development and build environment.
- **Lucide React**: Providing a consistent, minimalist iconography set.
- **Vanilla CSS**: Optimized, utility-free styling for maximum performance and design control.

---

## Installation and Deployment

### Development Environment
1. Clone the repository to your local machine.
2. Execute `npm install` to install all required dependencies.
3. Launch the development server using `npm run dev`.

### Production Build
1. Run `npm run build` to generate the optimized production bundle.
2. The output will be located in the `dist/` directory, ready for hosting on any static web server.

### Deployment on Vercel (Recommended)

This project is optimized for deployment on Vercel. 
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Connect your repository to [Vercel](https://vercel.com/new).
3. The included `vercel.json` ensures that all routes are correctly redirected to `index.html`, maintaining the Single Page Application's functionality.

---

## Security and Privacy

- **Local Execution**: All data processing, including price history tracking and comparison logic, occurs entirely on the client side. No personal or browsing data is transmitted to external servers.
- **Input Sanitization**: All user-provided search strings are sanitized before being processed by the regex engine to prevent injection or performance-related exploits.
- **Secure Asset Delivery**: All project assets, including custom-generated hardware imagery, are served through secure local paths or trusted CDNs.

---

## License

This project is licensed under the MIT License. Details can be found in the included LICENSE file.
