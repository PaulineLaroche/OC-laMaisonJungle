import "../styles/Cart.css"
import { useState, useEffect } from "react"

function Cart({ cart, updateCart }) {
	const [isOpen, setIsOpen] = useState(true)
	const total = cart.reduce(
		(acc, plantType) => acc + plantType.amount * plantType.price,
		0
	)
    useEffect(() => {
        document.title = `LMJ: ${total}€ d'achats`
    }, [total])

    const removeFromCart = (index) => {
        const cartCopy = [...cart]; // copie cart pour éviter de le modifier par adresse, même si vu que c'est un state ça devrait pas poser de soucis
        cartCopy.splice(index, 1); // retire 1 element à l'index passé en param dans ton tableau
        console.log({cartCopy});
        updateCart(cartCopy);// met cart à jour dans le parent.
    }

	return isOpen ? (
		<div className='lmj-cart'>
			<button
				className='lmj-cart-toggle-button'
				onClick={() => setIsOpen(false)}
			>
				Fermer
			</button>
			{cart.length > 0 ? (
				<div>
					<h2>Panier</h2>
					<ul>
						{cart.map(({ name, price, amount }, index) => (
							<div key={`${name}-${index}`}>
								{name} {price}€ x {amount}
                                <button onClick={() => removeFromCart(index)}>Supprimer</button>
							</div>
						))}
					</ul>
					<h3>Total :{total}€</h3>
					<button onClick={() => updateCart([])}>Vider le panier</button>
				</div>
			) : (
				<div>Votre panier est vide</div>
			)}
		</div>
	) : (
		<div className='lmj-cart-closed'>
			<button
				className='lmj-cart-toggle-button'
				onClick={() => setIsOpen(true)}
			>
				Ouvrir le Panier
			</button>
		</div>
	)
}

export default Cart