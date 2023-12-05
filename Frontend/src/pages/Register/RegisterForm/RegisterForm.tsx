import { fields, updateFields } from ".";
import { Field, change, reduxForm } from "redux-form";
import Button from "components/atoms/Button";
import ReduxFormFields from "components/molecules/ReduxFormFields";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useEffect, useState } from "react";
import dobCalc from "utils/calculator.util";
import AuthService from "services/auth.service";
import { useLocation } from "react-router-dom";
import { tabActions } from "redux/slices/tab";
import PhoneInputRedux from "components/molecules/PhoneInputRedux/PhoneInputRedux";
import SelectRedux from "components/molecules/SelectRedux/SelectRedux";
import InputRedux from "components/molecules/InputRedux/InputRedux";
import SocketService from "services/socket.service";
// import { tabActions } from "redux/slices/tab";
function RegisterForm({ handleSubmit }: any) {
  const form = "RegisterForm";
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [partnerOptions, setPartnerOptions] = useState<any[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const visitUser = useAppSelector((state) => state.user.user);
  const dob = useAppSelector((state) => state.form?.[form]?.values?.dob);
  const relation = useAppSelector(
    (state) => state.form?.[form]?.values?.partner
  );

  useEffect(() => {
    if (!dob?.date) return;
    let response = dobCalc(dob?.date);

    dispatch(change(form, "age", response?.age));
    dispatch(change(form, "zodiac", response?.zodiac));
    dispatch(change(form, "star", response?.star));
    dispatch(change(form, "planet", response?.planet));
  }, [dispatch, dob?.date]);

  useEffect(() => {
    // if (user) {
    dispatch(
      change(
        form,
        "name",
        pathname.includes("profile") ? visitUser?.name : user?.name
      )
    );
    dispatch(
      change(
        form,
        "race",
        pathname.includes("profile") ? visitUser?.race : user?.race
      )
    );
    dispatch(
      change(
        form,
        "gender",
        pathname.includes("profile") ? visitUser?.gender : user?.gender
      )
    );
    dispatch(
      change(
        form,
        "email",
        pathname.includes("profile") ? visitUser?.email : user?.email
      )
    );
    dispatch(
      change(form, "dob", {
        date: pathname.includes("profile") ? visitUser?.dob : user?.dob,
      })
    );
    dispatch(
      change(
        form,
        "age",
        pathname.includes("profile") ? visitUser?.age : user?.age
      )
    );
    dispatch(
      change(
        form,
        "star",
        pathname.includes("profile") ? visitUser?.star : user?.star
      )
    );
    dispatch(
      change(
        form,
        "zodiac",
        pathname.includes("profile") ? visitUser?.zodiac : user?.zodiac
      )
    );
    dispatch(
      change(
        form,
        "planet",
        pathname.includes("profile") ? visitUser?.planet : user?.planet
      )
    );
    dispatch(
      change(
        form,
        "hair",
        pathname.includes("profile") ? visitUser?.hair : user?.hair
      )
    );
    dispatch(
      change(
        form,
        "eyes",
        pathname.includes("profile") ? visitUser?.eyes : user?.eyes
      )
    );
    dispatch(
      change(
        form,
        "height",
        pathname.includes("profile") ? visitUser?.height : user?.height
      )
    );
    dispatch(
      change(
        form,
        "weight",
        pathname.includes("profile") ? visitUser?.weight : user?.weight
      )
    );
    dispatch(
      change(
        form,
        "blood",
        pathname.includes("profile") ? visitUser?.blood : user?.blood
      )
    );
    dispatch(
      change(
        form,
        "relationship",
        pathname.includes("profile")
          ? visitUser?.relationship
          : user?.relationship
      )
    );
    dispatch(
      change(
        form,
        "partner",
        pathname.includes("profile")
          ? visitUser?.partner?.name ?? "Single"
          : user?.partner?.name ?? "Single"
      )
    );
    dispatch(
      change(
        form,
        "country",
        pathname.includes("profile") ? visitUser?.country : user?.country
      )
    );
    dispatch(
      change(
        form,
        "phone",
        pathname.includes("profile") ? visitUser?.phone : user?.phone
      )
    );
    dispatch(
      change(
        form,
        "facebook",
        pathname.includes("profile") ? visitUser?.facebook : user?.facebook
      )
    );
    dispatch(
      change(
        form,
        "instagram",
        pathname.includes("profile") ? visitUser?.instagram : user?.instagram
      )
    );
    dispatch(
      change(
        form,
        "twitter",
        pathname.includes("profile") ? visitUser?.twitter : user?.twitter
      )
    );
    dispatch(
      change(
        form,
        "youtube",
        pathname.includes("profile") ? visitUser?.youtube : user?.youtube
      )
    );
    dispatch(
      change(
        form,
        "snapchat",
        pathname.includes("profile") ? visitUser?.snapchat : user?.snapchat
      )
    );
    dispatch(
      change(
        form,
        "tiktok",
        pathname.includes("profile") ? visitUser?.tiktok : user?.tiktok
      )
    );
    dispatch(
      change(
        form,
        "discord",
        pathname.includes("profile") ? visitUser?.discord : user?.discord
      )
    );
    dispatch(
      change(
        form,
        "paypal",
        pathname.includes("profile") ? visitUser?.paypal : user?.paypal
      )
    );
    // }
  }, [
    dispatch,
    pathname,
    user,
    visitUser?.age,
    visitUser?.blood,
    visitUser?.country,
    visitUser?.discord,
    visitUser?.dob,
    visitUser?.email,
    visitUser?.eyes,
    visitUser?.facebook,
    visitUser?.gender,
    visitUser?.hair,
    visitUser?.height,
    visitUser?.instagram,
    visitUser?.name,
    visitUser?.partner,
    visitUser?.paypal,
    visitUser?.phone,
    visitUser?.planet,
    visitUser?.race,
    visitUser?.relationship,
    visitUser?.snapchat,
    visitUser?.star,
    visitUser?.tiktok,
    visitUser?.twitter,
    visitUser?.weight,
    visitUser?.youtube,
    visitUser?.zodiac,
  ]);

  // useEffect(() => {
  //   let array: any[] = [{ value: "single", label: "Single" }];
  //   if (pathname.includes("profile")) {
  //     visitUser?.friends?.forEach((obj: any) => {
  //       array.push({ value: obj._id, label: obj.name });
  //     });
  //   } else {
  //     user?.friends?.forEach((obj: any) => {
  //       array.push({ value: obj._id, label: obj.name });
  //     });
  //   }
  //   setPartnerOptions(array);
  // }, [user, visitUser]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {user && !pathname.includes("profile") && (
        <div style={{
          marginBottom: "16px", textAlign: "center", display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <button
            // variant="text"
            onClick={() => {
              SocketService.sendLogout(user?._id);
              AuthService.logout();
            }}
            style={{
              cursor: "pointer", display: "inline", border: 0,
              fontFamily: "'Varela Round', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              background: "none",
              color: "white",
              padding: 0,
              // marginTop: "2px",
              marginBottom: "0.83em",
              userSelect: "text",
              marginRight: "32px"
            }}
          >
            Logout
          </button>

          <button type="submit" style={{
            cursor: "pointer", display: "inline", border: 0,
            fontFamily: "'Varela Round', sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            background: "none",
            color: "white",
            padding: 0,
            // marginTop: "2px",
            marginBottom: "0.83em",
            userSelect: "text",
            marginRight: "32px"
          }}>
            Save
          </button>

          <button
            // variant="text"
            type="button"
            onClick={() => {
              // dispatch(tabActions.setUpload(false));
              // SocketService.sendLogout(user?._id);
              // AuthService.logout();
              AuthService.delete();
              
              
            }}
            style={{
              cursor: "pointer", display: "inline", border: 0,
              fontFamily: "'Varela Round', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              background: "none",
              color: "white",
              padding: 0,
              // marginTop: "2px",
              marginBottom: "0.83em",
              userSelect: "text",
              marginRight: "32px"
            }}
          // disableElevation
          >
            Delete
          </button>

          <button
            // variant="text"
            onClick={() => dispatch(tabActions.setUpload(true))}
            style={{
              cursor: "pointer", display: "inline", border: 0,
              fontFamily: "'Varela Round', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              background: "none",
              color: "white",
              padding: 0,
              // marginTop: "2px",
              marginBottom: "0.83em",
              userSelect: "text",
              // marginRight: "32px"
            }}
          >
            Upload
          </button>
        </div>
      )}
      <div
        style={{
          height: "calc(100vh - 180px)",
          overflowY: "auto",
          paddingRight: "5px",
        }}
      >
        <ReduxFormFields fields={fields} />
        {!user && !pathname.includes("profile") && (
          <Button
            variant="text"
            type="submit"
            disableElevation
            style={{
              minWidth: "auto",
              marginTop: "16px",
              paddingLeft: 0,
              borderColor: "#ffffff",
            }}
          >
            Register
          </Button>
        )}
        {user || pathname.includes("profile") ? (
          <>
            <div style={{ marginTop: "16px" }}>
              {/* <Field
                name="partner"
                label="Relationship"
                component={SelectRedux}
                defaultValue={"single"}
                SelectProps={{
                  options: partnerOptions,
                }}
              ></Field> */}

              <Field
                disabled
                name="partner"
                label="Relationship"
                component={InputRedux}
              />
            </div>
            {/* {relation === "partner" && (
              <div style={{ marginTop: "16px" }}>
                <Field
                  name="partner"
                  label="Partner"
                  component={SelectRedux}
                  SelectProps={{
                    options: partnerOptions,
                  }}
                ></Field>
              </div>
            )} */}
            <div style={{ marginTop: "16px" }}>
              <Field name="phone" label="Phone" component={PhoneInputRedux} />
              {/* <ReduxFormFields fields={updateFields} /> */}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
export default reduxForm({ form: "RegisterForm" })(RegisterForm);
