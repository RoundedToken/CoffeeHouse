import data from './products.json';

export default function () {
    const previews = document.querySelectorAll('.preview');
    const modal = document.querySelector('.modal');
    const baseUrl = '/roundedtoken-JSFE2023Q4/coffee-house/dist/';

    modal.addEventListener('click', (e) => {
        if (e.target == modal || !e.target.closest('.modal-container')) {
            modal.style.display = 'none';
            modal.innerHTML = '';
            document.body.style.overflow = 'auto';
        }
    });

    for (const preview of previews) {
        preview.addEventListener('click', () => {
            const [categoryName, ind] = preview.id.split('-');
            const product = data.filter((p) => p.category === categoryName)[ind];
            const { name, description, price, sizes, additives } = product;
            const {
                s: { 'add-price': sPrice },
                m: { 'add-price': mPrice },
                l: { 'add-price': lPrice },
            } = sizes;

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            const dopPrices = additives.map((a) => a['add-price']);
            let sizesState = sPrice;
            const dopState = [
                { p: dopPrices[0], active: false },
                { p: dopPrices[1], active: false },
                { p: dopPrices[2], active: false },
            ];

            const modalPreview = document.createElement('div');
            modalPreview.classList.add('modal-container');
            modalPreview.innerHTML = `
        <div class="modal-preview">
            <div class="image-box">
                <img src="${baseUrl}${categoryName}-${
                +ind + 1
            }.png" alt="" width="340" height="340" />
            </div>

            <div class="modal-description">
                <div class="modal-title">
                    <h3>${name}</h3>

                    <p class="medium">
                        ${description}
                    </p>
                </div>

                <div class="modal-size">
                    <p class="medium">Size</p>

                    <div class="modal-tabs">
                        <label class="modal-tab modal-tab-active size-tab">
                            <span class="modal-icon link-t">S</span>
                            <input value="${sPrice}" id="size-radio" type="radio" name="${name}-size"></input>
                            <p class="link-t">200 ml</p>
                        </label>
                        <label class="modal-tab size-tab">
                            <span class="modal-icon link-t">M</span>
                            <input value="${mPrice}" id="size-radio" type="radio" name="${name}-size"></input>
                            <p class="link-t">300 ml</p>
                        </label>
                        <label class="modal-tab size-tab">
                            <span class="modal-icon link-t">L</span>
                            <input value="${lPrice}" id="size-radio" type="radio" name="${name}-size"></input>
                            <p class="link-t">400 ml</p>
                        </label>
                    </div>
                </div>

                <div class="modal-additives">
                    <p class="medium">Additives</p>

                    <div class="modal-tabs">
                        <label class="modal-tab modal-dop-tab">
                            <span class="modal-icon link-t">1</span>
                            <input type="checkbox" class="dop-tab" value="${dopPrices[0]}"></input>
                            <p class="link-t">Sugar</p>
                        </label>
                        <label class="modal-tab modal-dop-tab">
                            <span class="modal-icon link-t">2</span>
                            <input type="checkbox" class="dop-tab" value="${dopPrices[1]}"></input>
                            <p class="link-t">Cinnamon</p>
                        </label>
                        <label class="modal-tab modal-dop-tab">
                            <span class="modal-icon link-t">3</span>
                            <input type="checkbox" class="dop-tab" value="${dopPrices[2]}"></input>
                            <p class="link-t">Syrup</p>
                        </label>
                    </div>
                </div>

                <div class="modal-total">
                    <h3>Total:</h3>
                    <h3 class="total-price">$${price}</h3>
                </div>

                <div class="modal-alert">
                    <img src="${baseUrl}info-empty.svg" alt="Info" width="16" height="16" />

                    <p class="caption">
                        The cost is not final. Download our mobile app to see the final
                        price and place your order. Earn loyalty points and enjoy your
                        favorite coffee with up to 20% discount.
                    </p>
                </div>

                <button class="modal-close">Close</button>
            </div>
        </div>`;

            modal.appendChild(modalPreview);

            const modalClose = document.querySelector('.modal-close');
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
                modal.innerHTML = '';
                document.body.style.overflow = 'auto';
            });
            const totalPrice = document.querySelector('.total-price');
            const sizesI = document.querySelectorAll('#size-radio');
            const sizeTabs = document.querySelectorAll('.size-tab');

            function calcPrice() {
                return (
                    +sizesState +
                    +price +
                    dopState.reduce((acc, v) => (acc += v.active ? +v.p : 0), 0)
                );
            }

            sizesI.forEach((s, index) =>
                s.addEventListener('change', () => {
                    sizesState = s.value;
                    const newPrice = calcPrice().toFixed(2);
                    totalPrice.innerText = `$${newPrice}`;

                    sizeTabs.forEach((t) => t.classList.remove('modal-tab-active'));
                    sizeTabs[index].classList.add('modal-tab-active');
                })
            );

            const dopInputs = document.querySelectorAll('.dop-tab');
            const dopTabs = document.querySelectorAll('.modal-dop-tab');
            dopInputs.forEach((d, index) =>
                d.addEventListener('change', () => {
                    dopState[index].active = d.checked;
                    const newPrice = calcPrice().toFixed(2);
                    totalPrice.innerText = `$${newPrice}`;
                    dopTabs[index].classList.toggle('modal-tab-active');
                })
            );
        });
    }
}
