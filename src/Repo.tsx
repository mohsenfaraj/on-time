type props = {
  name: number;
  link: string;
  remove: (a: string) => void;
  disabled: boolean;
};
export default function Repo({ name, link, remove, disabled }: props) {
  return (
    <div className="repo">
      <label>{name}</label>
      <input type="text" value={link} />
      <button>
        <i className="fas fa-share"></i>
      </button>
      <button
        className="red"
        disabled={disabled}
        onClick={() => {
          remove(link);
        }}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}
