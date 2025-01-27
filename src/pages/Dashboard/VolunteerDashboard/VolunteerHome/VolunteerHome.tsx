import useAuth from "@/hooks/useAuth";
import Welcome from "@/shared/Welcome/Welcome";

const VolunteerHome = () => {
  const { user }: any = useAuth();
  return (
    <div>
      <div>
        <div>
          <Welcome
            name={user.displayName}
            subHeading1={"a great volunteer"}
            subHeading2={"so active"}
            subHeading3={"such a hard worker"}
          ></Welcome>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHome;
