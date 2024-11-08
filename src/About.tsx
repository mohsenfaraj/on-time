import { base, origin } from "./vars";

type Props = {};
const About = (props: Props) => {
  return (
    <div className="rtl text-right leading-8">
      <h1 className="text-2xl text-primary border-b border-primary font-bold text-center mb-5">
        راهنما
      </h1>
      <p>
        پروژه <strong className="text-primary">آن‌تایم</strong> با هدف راحت‌تر
        کردن دسترسی به زمان سرویس‌ها و اطلاع از زمان سرویس بعدی ساخته شده است.
      </p>
      <p>
        این وب اپلیکیشن قابلیت نصب و اجرای آفلاین بر روی دستگاه‌های موبایل را
        دارا است. برای نصب مراحل زیر را دنبال کنید:
      </p>
      <ul className="list-disc ps-5">
        <li>ابتدا این وب‌سایت را با مرورگری همانند گوگل کروم باز کنید.</li>
        <li>
          پس از باز کردن پیغامی برای نصب ظاهر می‌شود و می‌توانید اقدام به نصب
          کنید. در صورتیکه پیامی نیامد به مرحله بعد بروید.
        </li>
        <li>
          از گوشه مرورگر بر روی دکمه (...) کلیک کنید و گزینه Add to Home screen
          را انتخاب کنید.
        </li>
        <li>
          در صفحه باز شده بر روی Install کلیک کنید و در پنجره بعدی مجددا Install
          را انتخاب کنید.
        </li>
        <li>
          با انجام کارهای بالا آن‌تایم به لیست برنامه‌های نصب شده شما در صفحه
          اصلی اضافه خواهد شد.
        </li>
      </ul>
      <hr className="my-3" />
      <p>
        این برنامه از فایل اکسل برای خواندن اطلاعات استفاده می‌کند. در صورتیکه
        دانشجوی دانشگاه صنعتی ارومیه نیستید همچنان می‌توانید با انجام مراحل زیر
        هر برنامه زمانی را به این وب اپلیکیشن اضافه کنید:
      </p>
      <ul className="list-disc ps-5">
        <li>
          دانلود و ویرایش{" "}
          <a
            href={origin + base + "UUT-BUS.xlsx"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            فایل نمونه اکسل
          </a>{" "}
          مطابق برنامه زمانی شما
        </li>
        <li>آپلود فایل در اینترنت (پیشنهادی: گوگل شیت با دسترسی عمومی)</li>
        <li>
          انتخاب دکمه افزودن برنامه جدید از تنظیمات و وارد کردن لینک فایل اکسل و
          نام برنامه زمانی و تست برنامه
        </li>
        <li>
          {" "}
          انتخاب دکمه اشتراک گذاری برنامه مدنظر از قسمت «برنامه‌های زمانی فعال»
          برای کپی کردن لینک
        </li>
        <li>اشتراک گذاری این لینک با بقیه افراد برای اضافه کردن راحت‌تر</li>
      </ul>
      <p>
        توضیحات در مورد فایل اکسل: هر ستون یک برنامه زمانی است و فایل حداقل باید
        دو ستون داشته باشد (ستون اول رفت و ستون دوم برگشت) ردیف اول ستون نام
        سرویس‌ها است. در صورتیکه برنامه شما دارای زیر برنامه است (مثلا برای
        روزهای خاص هفته) کافی است اسم همان برنامه را عینا با یک فاصله و سپس نام
        زیر برنامه را داخل پارانتز بنویسید. در این صورت این ستون زیر برنامه‌ای
        از برنامه مدنظر خواهد بود. سلول‌های خالی و سلول‌هایی که - دارند نادیده
        گرفته خواهد شد.
      </p>
      <hr className="my-3" />

      <div className="text-center">
        <p>
          برنامه‌نویسی شده توسط{" "}
          <a
            href="http://mohsenfaraj.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            محسن فرج‌اللهی
          </a>
        </p>
        <p>
          <a
            href="http://codegeeks.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            انجمن علمی کامپیوتر دانشگاه صنعتی ارومیه
          </a>
        </p>
      </div>
    </div>
  );
};
export default About;
