## GeoIP Lookup

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-green)](https://vitejs.dev/)

GeoIP Lookup is a modern, responsive web application that allows users to enter an IP address (or leave blank to auto-detect) and get accurate geolocation information, including a live interactive map. Built with **React**, **TypeScript**, and **Leaflet**, it features dark/light modes, smooth animations, and a responsive design suitable for all screen sizes.

---

## Features

- Auto-detect your IP location.
- Lookup any IP address globally.
- Interactive map displaying geolocation.
- Responsive layout for desktop, tablet, and mobile.
- Dark and light mode toggle.
- Smooth UI animations.
- Cached results for faster repeated lookups.
- Footer and navbar designed for branding/logo placement.
- Debug panel to inspect raw API response.
- Uses IPstack API for accurate geolocation data.

---

## Demo

> A live demo can be hosted on platforms like [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

---

## Screenshots

![Screenshot](./screenshots/geoip-lookup.png)

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/geoip-lookup.git
cd geoip-lookup


2. **Install dependencies**

npm install
# or
yarn install

## Usage

Enter an IP address in the input field or leave it blank to auto-detect your current IP.

Click Lookup.

View the geolocation data in the GeoCard and see the marker on the interactive map.

Toggle between dark and light mode using the icon in the navbar.

## Technologies Used

1. React
2. TypeScript
3. Vite
4. Leaflet
5. IPstack API
6. React Icons

# Project Structure

geoip-lookup/
├─ src/
│  ├─ components/
│  │  ├─ GeoCard.tsx
│  │  └─ MapView.tsx
│  ├─ services/
│  │  └─ ipstack.ts
│  ├─ types/
│  │  └─ ipstack.ts
│  ├─ App.tsx
│  └─ styles.css
├─ .env
├─ package.json
└─ README.md

## Contributions

1. Contributions are welcome! Please:
2. Fork the repository.
3. Create your feature branch (git checkout -b feature/YourFeature).
4. Commit your changes (git commit -m "Add some feature").
5. Push to the branch (git push origin feature/YourFeature).
6. Open a Pull Request.

##License

This project is licensed under the MIT License. See the LICENSE
 file for details.

## Footer / Credits

Powered by IPstack — providing accurate global IP geolocation data.
Developed by PhileTech.
