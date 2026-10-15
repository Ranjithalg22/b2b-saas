
import { useEffect, useState } from 'react'
import './App.css'

const plans = [
  {
    id: 1,
    name: 'Free',
    price: 0,
    description: 'For getting started',
    features: ['Up to 5 team members', 'Basic features', 'Email support'],
  },
  {
    id: 2,
    name: 'Basic',
    price: 499,
    description: 'For small businesses',
    features: ['Up to 20 team members', 'Advanced features', 'Priority support', 'Analytics'],
    popular: true,
  },
  {
    id: 3,
    name: 'Premium',
    price: 999,
    description: 'For growing businesses',
    features: ['Unlimited team members', 'All features included', '24/7 support', 'Custom integrations'],
  },
]

function readSubscription() {
  try {
    return JSON.parse(localStorage.getItem('subscription')) || null
  } catch {
    return null
  }
}

function App() {
  const [subscription, setSubscription] = useState(readSubscription)
  const [page, setPage] = useState('plans')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (subscription) {
      localStorage.setItem('subscription', JSON.stringify(subscription))
    } else {
      localStorage.removeItem('subscription')
    }
  }, [subscription])

  function choosePlan(plan) {
    setSelectedPlan(plan)
    setNotice('')
    setPage('checkout')
  }

  function activatePlan() {
    if (!selectedPlan) return

    setSubscription({
      plan: selectedPlan,
      status: 'Active',
      billingCycle: 'Monthly',
      activatedAt: new Date().toISOString(),
    })

    setSelectedPlan(null)
    setNotice('Your demo subscription has been activated.')
    setPage('dashboard')
  }

  function cancelSubscription() {
    if (!window.confirm('Are you sure you want to cancel your demo subscription?')) {
      return
    }

    setSubscription(null)
    setNotice('Your demo subscription has been cancelled.')
    setPage('dashboard')
  }

  const activePlan = subscription?.plan

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setPage('plans')}>
          <span className="brand-mark">S</span>
          <span>Subscribely</span>
        </button>

        <nav className="main-nav">
          <button
            className={page === 'plans' ? 'nav-link selected' : 'nav-link'}
            onClick={() => setPage('plans')}
          >
            Plans
          </button>
          <button
            className={page === 'dashboard' ? 'nav-link selected' : 'nav-link'}
            onClick={() => setPage('dashboard')}
          >
            Dashboard
          </button>
        </nav>

        <div className="profile">
          <span className="avatar">R</span>
          <span>My Account</span>
        </div>
      </header>

      {notice && (
        <div className="notice">
          <span>{notice}</span>
          <button onClick={() => setNotice('')} aria-label="Dismiss notification">
            ×
          </button>
        </div>
      )}

      {page === 'plans' && (
        <main>
          <section className="hero">
            <span className="eyebrow">SIMPLE. FLEXIBLE. BUSINESS-READY.</span>
            <h1>Plans that grow with your business.</h1>
            <p>
              Everything your team needs to manage subscriptions in one place.
              Choose the plan that works for you.
            </p>
            <div className="trust-line">
              <span>✓ Easy to get started</span>
              <span>✓ Flexible plans</span>
              <span>✓ Demo checkout</span>
            </div>
          </section>

          <section className="pricing-section">
            <div className="section-heading">
              <div>
                <h2>Choose your plan</h2>
                <p>Transparent pricing, with no surprises.</p>
              </div>
              <span className="billing-label">Monthly billing</span>
            </div>

            <div className="pricing-grid">
              {plans.map((plan) => (
                <article
                  className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                  key={plan.id}
                >
                  {plan.popular && (
                    <span className="popular-badge">MOST POPULAR</span>
                  )}

                  <div className="plan-icon">
                    {plan.id === 1 ? '◈' : plan.id === 2 ? '▦' : '✦'}
                  </div>

                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>

                  <div className="price">
                    <span>₹{plan.price.toLocaleString('en-IN')}</span>
                    <small>/ month</small>
                  </div>

                  <p className="feature-intro">What's included</p>

                  <ul className="feature-list">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span className="check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={plan.popular ? 'primary-button full-button' : 'secondary-button full-button'}
                    onClick={() => choosePlan(plan)}
                  >
                    Choose {plan.name} <span>→</span>
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="bottom-banner">
            <div className="banner-icon">✦</div>
            <div>
              <h3>Built for teams that want to grow</h3>
              <p>Start with a plan today and manage your subscription from one dashboard.</p>
            </div>
            <button className="secondary-button" onClick={() => setPage('dashboard')}>
              Open dashboard →
            </button>
          </section>
        </main>
      )}

      {page === 'checkout' && selectedPlan && (
        <main className="checkout-layout">
          <button className="back-link" onClick={() => setPage('plans')}>
            ← Back to plans
          </button>

          <section className="checkout-card">
            <span className="eyebrow">SUBSCRIPTION CHECKOUT</span>
            <h1>Review your plan</h1>
            <p className="muted">Confirm your selection to continue.</p>

            <div className="checkout-summary">
              <div>
                <span className="summary-icon">▦</span>
              </div>
              <div className="summary-info">
                <h3>{selectedPlan.name} Plan</h3>
                <p>{selectedPlan.description}</p>
              </div>
              <div className="summary-price">
                <strong>₹{selectedPlan.price.toLocaleString('en-IN')}</strong>
                <small>/month</small>
              </div>
            </div>

            <div className="payment-info">
              <h3>Payment details</h3>
              <p>This is a simulated demo checkout. No real money will be charged.</p>
            </div>

            <button className="primary-button full-button" onClick={activatePlan}>
              {selectedPlan.price === 0
                ? 'Activate free plan'
                : 'Simulate successful payment'}
              <span>→</span>
            </button>

            <button
              className="secondary-button full-button cancel-checkout"
              onClick={() => {
                setSelectedPlan(null)
                setPage('plans')
              }}
            >
              Cancel
            </button>
          </section>
        </main>
      )}

      {page === 'dashboard' && (
        <main className="dashboard-page">
          <div className="dashboard-heading">
            <div>
              <span className="eyebrow">YOUR WORKSPACE</span>
              <h1>Welcome back!</h1>
              <p>Here's an overview of your subscription account.</p>
            </div>
            <button className="primary-button" onClick={() => setPage('plans')}>
              + Explore plans
            </button>
          </div>

          {subscription ? (
            <>
              <section className="stats-grid">
                <article className="stat-card">
                  <span className="stat-label">CURRENT PLAN</span>
                  <h2>{activePlan.name}</h2>
                  <span className="stat-foot">Your selected subscription</span>
                </article>

                <article className="stat-card">
                  <span className="stat-label">MONTHLY PRICE</span>
                  <h2>₹{activePlan.price.toLocaleString('en-IN')}</h2>
                  <span className="stat-foot">Per billing month</span>
                </article>

                <article className="stat-card">
                  <span className="stat-label">SUBSCRIPTION STATUS</span>
                  <h2 className="status-active">
                    <span className="status-dot" /> Active
                  </h2>
                  <span className="stat-foot">Demo subscription</span>
                </article>

                <article className="stat-card">
                  <span className="stat-label">BILLING CYCLE</span>
                  <h2>{subscription.billingCycle}</h2>
                  <span className="stat-foot">Recurring billing demo</span>
                </article>
              </section>

              <section className="details-grid">
                <article className="panel">
                  <h3>Subscription details</h3>
                  <div className="detail-row">
                    <span>Plan name</span>
                    <strong>{activePlan.name}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Monthly price</span>
                    <strong>₹{activePlan.price.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Status</span>
                    <span className="status-pill">Active</span>
                  </div>
                  <div className="detail-row">
                    <span>Activated on</span>
                    <strong>
                      {new Date(subscription.activatedAt).toLocaleDateString('en-IN')}
                    </strong>
                  </div>
                  <p className="demo-caption">
                    Dates and subscription details are stored in this browser demo.
                  </p>
                </article>

                <article className="panel">
                  <h3>Manage subscription</h3>
                  <p className="muted">
                    Review available plans or cancel your current demo subscription.
                  </p>
                  <button className="primary-button" onClick={() => setPage('plans')}>
                    Change plan
                  </button>
                  <button className="danger-button" onClick={cancelSubscription}>
                    Cancel subscription
                  </button>
                </article>
              </section>
            </>
          ) : (
            <section className="empty-panel">
              <div className="empty-icon">◇</div>
              <h2>No active subscription yet</h2>
              <p>Choose a plan to see your subscription details here.</p>
              <button className="primary-button" onClick={() => setPage('plans')}>
                Browse plans →
              </button>
            </section>
          )}
        </main>
      )}

      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-mark">S</span>
          <strong>Subscribely</strong>
        </div>
        <p>Subscription management made simple.</p>
        <span>Demo project · No real payments</span>
      </footer>
    </div>
  )
}

export default App
