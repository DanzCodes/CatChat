import Protected from "../../../components/Protected";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Protected>
    {children}
  </Protected>
}