function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

describe("haversine fonksiyonu", () => {
  it("iki aynı nokta arasındaki mesafeyi 0 olarak hesaplamalıdır", () => {
    const distance = haversine(39.92, 32.85, 39.92, 32.85);
    expect(distance).toBe(0);
  });

  it("Ankara ve İstanbul arasındaki yaklaşık mesafeyi doğru hesaplamalıdır", () => {
    const ankaraLat = 39.92077;
    const ankaraLon = 32.85411;
    const istanbulLat = 41.0082;
    const istanbulLon = 28.9784;

    const distance = haversine(ankaraLat, ankaraLon, istanbulLat, istanbulLon);

    expect(distance).toBeCloseTo(349, 0); //approximately 350km
  });
});
