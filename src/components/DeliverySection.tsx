import Image from "next/image";

export const DeliverySection = () => {
  return (
    <section className="w-full px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto flex flex-col md:flex-col-rev lg:flex-row justify-center items-center gap-4 py-10">
          <div className="flex justify-center items-center border border-black/10 rounded-2xl p-6 gap-6 w-full shadow-sm max-w-xl md:h-24">
            <p className="text-5xl font-extrabold italic w-32 text-center">
              24H
            </p>
            <p className="text-sm opacity-80 text-left w-[260px]">
              Production de votre plaque <br />
              d’immatriculation en 24 heures
            </p> 
          </div>
          <div className="flex justify-center items-center border border-black/10 rounded-2xl p-6 gap-6 w-full shadow-sm max-w-xl md:h-24">
            <p className="text-5xl font-extrabold italic w-32 text-center">
              48H
            </p>
            <p className="text-sm opacity-80 text-left w-[260px]">
              Livraison sous 48 heures
              <br />
              si la commande est passée avant 12h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
