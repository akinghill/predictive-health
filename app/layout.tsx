import './globals.css';

export const metadata = {
  title: 'Predictive Health',
  description: 'Health diagnoses assisted by machine learning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
