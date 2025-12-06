import Header from "../Header";

export default function HeaderExample() {
  return <Header onContactClick={() => console.log("Contact clicked")} />;
}
