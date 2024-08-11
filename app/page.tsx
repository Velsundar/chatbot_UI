import Sidebar from './components/sideBarMUI';

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ paddingLeft: 250, paddingTop: 64, flexGrow: 1 }}>
      </div>
    </div>
  );
}
