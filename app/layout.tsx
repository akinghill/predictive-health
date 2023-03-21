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
      <body>{children}</body>
    </html>
  );
}
