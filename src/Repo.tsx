import { base, origin } from "./vars";

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
    <div className="flex bg-zinc-100 border-zinc-400 shadow p-5 rounded justify-around items-center gap-3 text-sm">
      <label>{name}</label>
      <input
        type="text"
        value={link}
        readOnly
        className="p-2 rounded flex-grow ltr overflow-hidden"
      />
      <div className="flex gap-2">
        <button
          onClick={() => handleShare(name, link)}
          className="h-5 w-5 flex justify-center items-center bg-zinc-500 p-4 rounded text-white "
        >
          <i className="fas fa-share"></i>
        </button>
        <button
          className="h-5 w-5 flex justify-center items-center bg-red-700 disabled:opacity-50 p-4 rounded text-white"
          disabled={disabled}
          onClick={() => {
            let RuSureAboutDat = confirm(
              `آیا از حذف برنامه «${name}» مطمئن هستید؟`
            );
            if (RuSureAboutDat) {
              remove(link);
            }
          }}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
}
