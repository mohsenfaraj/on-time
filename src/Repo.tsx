import { base, origin } from "./Vars";

type props = {
  name: string;
  link: string;
  remove: (a: string) => void;
  disabled: boolean;
};
export default function Repo({ name, link, remove, disabled }: props) {
  function handleShare(name: string, link: string) {
    let url = `${origin + base}add?name=${name}&link=${link}&rm=true`;
    navigator.clipboard.writeText(encodeURI(url));
    alert("آدرس اشتراک گذاری این برنامه با موفقیت کپی شد!");
  }
  return (
    <div className="repo">
      <label>{name}</label>
      <input type="text" value={link} readOnly />
      <button onClick={() => handleShare(name, link)}>
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
