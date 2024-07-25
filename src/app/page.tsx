import Loader from "@/components/Loader";

const MintPage = () => {
  return (
    <div>
      <Loader
        loading={true}
        text1="Minting"
        text2=" 2391.43 BLUE"
        handleShowLoader={async () => {
          "use server";
          console.log("I am happy");
        }}
      />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae natus beatae harum a porro amet
      nihil consequuntur sint. Saepe explicabo ullam eos eveniet illum eligendi quos accusamus
      sequi, rem provident.
    </div>
  );
};

export default MintPage;
