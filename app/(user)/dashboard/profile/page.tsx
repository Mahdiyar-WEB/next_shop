import EditUserForm from "./EditUserForm";
import BreadCrumbs from "components/BreadCrumbs";

const EditUserPage = async () => {
  return (
    <main className="md:p-7">
      <BreadCrumbs slugTitle="ویرایش اطلاعات" />
      <EditUserForm />
    </main>
  );
};

export default EditUserPage;
