import './style.css';
import { supabase, isSupabaseConfigured } from './supabase';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Root #app container is missing');
}

app.innerHTML = `
  <header class="site-header">
    <div class="container header-content">
      <a href="#home" class="brand-mark">High Deff Portal</a>
      <nav class="primary-nav">
        <a href="#ecosystem">Ecosystem</a>
        <a href="#mining">Mining</a>
        <a href="#rewards">Rewards</a>
        <a href="#houses">Homes & NFTs</a>
        <a href="#token-desk">Token Desk</a>
        <a href="#orders">Orders</a>
        <a href="#signup">Signups</a>
        <a href="#ad-marketplace">Ads</a>
        <a href="#governance">Governance</a>
      </nav>
    </div>
  </header>

  <main>
    <section id="home" class="hero hero-overview">
      <div class="container hero-layout">
        <div class="hero-copy">
          <span class="pill-label">Multi-channel rewards + commerce</span>
          <h1>Build, reward, and scale with High Deff</h1>
          <p>
            High Deff connects crypto mining, digital storefronts, delivery logistics, and community-driven investing so businesses and customers grow together. Earn High Deff Tokens, curate NFT-backed homes, and automate partner rewards from one autonomous dashboard.
          </p>
          <div class="cta-stack">
            <a class="btn btn-primary" href="#signup">Get Started</a>
            <a class="btn btn-secondary" href="#token-desk">Explore Token Desk</a>
          </div>
          <div class="compliance-banner">
            <strong>New:</strong> Corporate and debit cards launching soon — features are highlighted across this page with "Coming Soon" notices.
          </div>
        </div>
        <div class="hero-metrics">
          <div class="metric-tile">
            <p class="metric-label">Partners onboard</p>
            <p class="metric-value" data-metric="partners-count">0</p>
          </div>
          <div class="metric-tile">
            <p class="metric-label">Projected annual growth</p>
            <p class="metric-value">$1M target</p>
          </div>
          <div class="metric-tile">
            <p class="metric-label">Token ecosystems</p>
            <p class="metric-value">High Deff + 50 meme coins</p>
          </div>
          <div class="metric-tile coming-soon-badge">
            <p class="metric-label">Corporate / Debit cards</p>
            <p class="metric-value">Coming Soon</p>
          </div>
        </div>
      </div>
    </section>

    <section id="ecosystem" class="section">
      <div class="container">
        <h2 class="section-title">Connected ecosystem</h2>
        <div class="ecosystem-grid" id="ecosystem-grid"></div>
      </div>
    </section>

    <section id="mining" class="section surface-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Mining & rewards control center</h2>
          <p class="section-subtitle">Simulate High Deff Token mining, track reward balances, and monitor crypto allocations in real time.</p>
        </div>
        <div class="mining-grid">
          <div class="mining-console">
            <div class="console-header">
              <h3>Mining simulator</h3>
              <span class="status-pill" data-mining-status>Offline</span>
            </div>
            <div class="console-body">
              <div class="console-stats">
                <div>
                  <p class="stat-label">Runtime</p>
                  <p class="stat-value" data-mining-runtime>0m</p>
                </div>
                <div>
                  <p class="stat-label">Hashrate</p>
                  <p class="stat-value" data-mining-hashrate>0.00 GH/s</p>
                </div>
                <div>
                  <p class="stat-label">High Deff Tokens mined</p>
                  <p class="stat-value" data-mining-balance>0.0000 HDT</p>
                </div>
              </div>
              <div class="console-actions">
                <button class="btn btn-primary" data-action="start-mining">Start mining</button>
                <button class="btn btn-secondary" data-action="stop-mining" disabled>Stop mining</button>
              </div>
              <div class="console-note">
                Mining returns are simulated for planning purposes. Actual performance depends on hardware, network conditions, and High Deff compliance reviews.
              </div>
            </div>
          </div>
          <div class="reward-brief" id="reward-brief"></div>
        </div>
      </div>
    </section>

    <section id="rewards" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Reward programs by market</h2>
          <p class="section-subtitle">Compare local, international, and corporate reward plans. Toggle to view tailored incentives.</p>
        </div>
        <div class="reward-toggle" role="tablist">
          <button class="btn btn-pill active" data-reward-filter="all">All</button>
          <button class="btn btn-pill" data-reward-filter="local">Local</button>
          <button class="btn btn-pill" data-reward-filter="international">International</button>
          <button class="btn btn-pill" data-reward-filter="corporate">Corporate</button>
        </div>
        <div class="reward-grid" id="reward-grid"></div>
      </div>
    </section>

    <section id="houses" class="section surface-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">NFT-backed homes & estate vaults</h2>
          <p class="section-subtitle">Combine crypto mining, donations, and proof-of-work milestones to unlock fractional housing and NFT experiences.</p>
        </div>
        <div class="estate-grid" id="estate-grid"></div>
      </div>
    </section>

    <section id="token-desk" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Token desk & exchange</h2>
          <p class="section-subtitle">Buy High Deff Tokens with major assets, mint NFT packages, and schedule instant or automated payouts.</p>
        </div>
        <div class="token-desk-grid">
          <div class="token-purchase-card">
            <h3>Purchase High Deff Tokens</h3>
            <form class="token-form" id="token-purchase-form">
              <label class="form-label" for="purchase-amount">Amount to purchase (HDT)</label>
              <input id="purchase-amount" name="purchase-amount" type="number" min="0" step="0.0001" required placeholder="250" />

              <label class="form-label" for="payment-token">Pay with</label>
              <select id="payment-token" name="payment-token" required></select>

              <label class="form-label" for="wallet-address">Destination wallet</label>
              <input id="wallet-address" name="wallet-address" type="text" required placeholder="0x..." />

              <button class="btn btn-primary" type="submit">Quote purchase</button>
            </form>
            <div class="form-feedback" id="token-purchase-feedback"></div>
          </div>

          <div class="token-payout-card">
            <h3>Instant cash out</h3>
            <form class="token-form" id="cashout-form">
              <label class="form-label" for="cashout-amount">Amount to cash out (HDT)</label>
              <input id="cashout-amount" name="cashout-amount" type="number" min="0" step="0.01" required placeholder="100" />

              <label class="form-label" for="payout-method">Payout method</label>
              <select id="payout-method" name="payout-method" required>
                <option value="ach">ACH - Same day</option>
                <option value="instant">Instant pay (fees apply)</option>
                <option value="scheduled">Scheduled direct deposit</option>
              </select>

              <label class="form-label" for="cashout-schedule">Requested timing</label>
              <input id="cashout-schedule" name="cashout-schedule" type="datetime-local" required />

              <button class="btn btn-secondary" type="submit">Request cash out</button>
            </form>
            <div class="form-feedback" id="cashout-feedback"></div>
            <p class="payout-note">Minimum withdrawal thresholds and security reviews apply. Requests may be paused for compliance checks.</p>
          </div>

          <div class="token-metrics" id="token-metrics"></div>
        </div>
      </div>
    </section>

    <section id="orders" class="section surface-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Order & delivery hub</h2>
          <p class="section-subtitle">Manage local deliveries, international procurement, and corporate fulfilment from one workflow.</p>
        </div>
        <div class="order-grid">
          <div class="order-form-card">
            <h3>Place an order</h3>
            <form id="order-form" class="order-form">
              <label class="form-label" for="order-type">Order type</label>
              <select id="order-type" name="order-type" required>
                <option value="local">Local delivery</option>
                <option value="international">International shipment</option>
                <option value="corporate">Corporate procurement</option>
              </select>

              <label class="form-label" for="order-description">Items or services</label>
              <textarea id="order-description" name="order-description" rows="3" required placeholder="List the items or services required"></textarea>

              <label class="form-label" for="order-budget">Budget (USD)</label>
              <input id="order-budget" name="order-budget" type="number" min="0" step="0.01" required placeholder="500" />

              <label class="form-label" for="order-deadline">Target delivery date</label>
              <input id="order-deadline" name="order-deadline" type="date" required />

              <div class="form-checkbox">
                <input id="order-crypto" type="checkbox" name="order-crypto" />
                <label for="order-crypto">Apply crypto mining rewards to this order</label>
              </div>

              <button class="btn btn-primary" type="submit">Submit order</button>
            </form>
            <div class="form-feedback" id="order-feedback"></div>
          </div>
          <div class="order-insights">
            <h3>Fulfilment insights</h3>
            <div class="insight-cards" id="order-insight-cards"></div>
          </div>
          <div class="order-summary" id="order-summary"></div>
        </div>
      </div>
    </section>

    <section id="signup" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Autonomous onboarding</h2>
          <p class="section-subtitle">Modular signups adapt requirements as customers and businesses choose advanced features.</p>
        </div>
        <div class="signup-grid">
          <div class="signup-card">
            <h3>Customer signup</h3>
            <form id="customer-signup" class="signup-form" data-signup-type="customer">
              <div class="progress-indicator" data-progress="customer"></div>

              <fieldset class="form-section">
                <legend>Identity</legend>
                <label class="form-label" for="customer-name">Full name</label>
                <input id="customer-name" name="customer-name" type="text" required />

                <label class="form-label" for="customer-email">Email</label>
                <input id="customer-email" name="customer-email" type="email" required />

                <label class="form-label" for="customer-address">Address</label>
                <input id="customer-address" name="customer-address" type="text" required />

                <label class="form-label" for="customer-id">Government ID number</label>
                <input id="customer-id" name="customer-id" type="text" required />

                <label class="form-label" for="customer-face">Face verification URL</label>
                <input id="customer-face" name="customer-face" type="url" placeholder="https://verification.example" />
              </fieldset>

              <fieldset class="form-section">
                <legend>Choose experiences</legend>
                <div class="form-checkbox">
                  <input id="customer-delivery" type="checkbox" data-conditional-toggle="delivery" />
                  <label for="customer-delivery">Enable delivery & meal rewards</label>
                </div>
                <div class="form-checkbox">
                  <input id="customer-homes" type="checkbox" data-conditional-toggle="homes" />
                  <label for="customer-homes">Join High Deff homes & NFT estates</label>
                </div>
                <div class="form-checkbox">
                  <input id="customer-invest" type="checkbox" data-conditional-toggle="invest" />
                  <label for="customer-invest">Activate token investing & exchange access</label>
                </div>
              </fieldset>

              <div class="conditional-section" data-condition="delivery">
                <h4>Delivery preferences</h4>
                <label class="form-label" for="customer-delivery-window">Preferred delivery window</label>
                <input id="customer-delivery-window" name="customer-delivery-window" type="text" placeholder="Weekdays 4-8pm" />

                <label class="form-label" for="customer-diet">Dietary or storage notes</label>
                <textarea id="customer-diet" name="customer-diet" rows="2" placeholder="Allergies, temperature control, delivery codes"></textarea>
              </div>

              <div class="conditional-section" data-condition="homes">
                <h4>Homes & NFT participation</h4>
                <label class="form-label" for="customer-home-goal">Desired home value</label>
                <input id="customer-home-goal" name="customer-home-goal" type="number" min="0" step="100" placeholder="300000" />

                <label class="form-label" for="customer-nft-wallet">NFT wallet</label>
                <input id="customer-nft-wallet" name="customer-nft-wallet" type="text" placeholder="Enjin wallet address" />
              </div>

              <div class="conditional-section" data-condition="invest">
                <h4>Investment preferences</h4>
                <label class="form-label" for="customer-invest-risk">Risk appetite</label>
                <select id="customer-invest-risk" name="customer-invest-risk">
                  <option value="conservative">Conservative</option>
                  <option value="balanced">Balanced</option>
                  <option value="aggressive">Aggressive</option>
                </select>

                <label class="form-label" for="customer-withdrawal">Preferred withdrawal cadence</label>
                <select id="customer-withdrawal" name="customer-withdrawal">
                  <option value="as-needed">On demand</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <fieldset class="form-section">
                <legend>Supporting files</legend>
                <label class="form-label" for="customer-files">Upload documents</label>
                <input id="customer-files" name="customer-files" type="file" multiple />
                <ul class="upload-preview" id="customer-upload-preview"></ul>
              </fieldset>

              <button class="btn btn-primary" type="submit">Save application</button>
              <div class="form-feedback" id="customer-feedback"></div>
            </form>
          </div>

          <div class="signup-card">
            <h3>Business signup</h3>
            <form id="business-signup" class="signup-form" data-signup-type="business">
              <div class="progress-indicator" data-progress="business"></div>

              <fieldset class="form-section">
                <legend>Business profile</legend>
                <label class="form-label" for="business-name">Business name</label>
                <input id="business-name" name="business-name" type="text" required />

                <label class="form-label" for="business-type">Business type</label>
                <input id="business-type" name="business-type" type="text" required placeholder="Food, retail, services" />

                <label class="form-label" for="business-address">Headquarters address</label>
                <input id="business-address" name="business-address" type="text" required />

                <label class="form-label" for="business-contact">Primary contact email</label>
                <input id="business-contact" name="business-contact" type="email" required />

                <label class="form-label" for="business-hours">Hours of operation</label>
                <input id="business-hours" name="business-hours" type="text" placeholder="Mon-Sun 7a-10p" />
              </fieldset>

              <fieldset class="form-section">
                <legend>Program options</legend>
                <div class="form-checkbox">
                  <input id="business-delivery" type="checkbox" data-conditional-toggle="business-delivery" />
                  <label for="business-delivery">Activate High Deff delivery network</label>
                </div>
                <div class="form-checkbox">
                  <input id="business-rewards" type="checkbox" data-conditional-toggle="business-rewards" />
                  <label for="business-rewards">Run custom rewards & partner discounts</label>
                </div>
                <div class="form-checkbox">
                  <input id="business-loans" type="checkbox" data-conditional-toggle="business-loans" />
                  <label for="business-loans">Request loans, houses, or NFT inventory</label>
                </div>
              </fieldset>

              <div class="conditional-section" data-condition="business-delivery">
                <h4>Delivery configuration</h4>
                <label class="form-label" for="business-delivery-radius">Delivery radius (miles)</label>
                <input id="business-delivery-radius" name="business-delivery-radius" type="number" min="0" step="0.5" placeholder="15" />

                <label class="form-label" for="business-menu-link">Menu or catalog link</label>
                <input id="business-menu-link" name="business-menu-link" type="url" placeholder="https://yourstore.com/menu" />
              </div>

              <div class="conditional-section" data-condition="business-rewards">
                <h4>Reward governance</h4>
                <label class="form-label" for="business-reward-budget">Monthly reward budget (USD)</label>
                <input id="business-reward-budget" name="business-reward-budget" type="number" min="0" step="0.01" placeholder="500" />

                <label class="form-label" for="business-click-goal">Desired clicks per month</label>
                <input id="business-click-goal" name="business-click-goal" type="number" min="0" step="10" placeholder="500" />
              </div>

              <div class="conditional-section" data-condition="business-loans">
                <h4>Capital requests</h4>
                <label class="form-label" for="business-loan-amount">Loan amount requested</label>
                <input id="business-loan-amount" name="business-loan-amount" type="number" min="0" step="100" placeholder="25000" />

                <label class="form-label" for="business-asset-type">Asset interest</label>
                <select id="business-asset-type" name="business-asset-type">
                  <option value="house">House</option>
                  <option value="nft">NFT inventory</option>
                  <option value="equipment">Equipment</option>
                  <option value="marketing">Marketing budget</option>
                </select>
              </div>

              <fieldset class="form-section">
                <legend>Supporting files</legend>
                <label class="form-label" for="business-files">Upload documents</label>
                <input id="business-files" name="business-files" type="file" multiple />
                <ul class="upload-preview" id="business-upload-preview"></ul>
              </fieldset>

              <button class="btn btn-primary" type="submit">Save business profile</button>
              <div class="form-feedback" id="business-feedback"></div>
            </form>
          </div>
        </div>
        <div class="signup-downloads" id="signup-downloads"></div>
      </div>
    </section>

    <section id="worker-hub" class="section surface-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Worker & franchise sub-accounts</h2>
          <p class="section-subtitle">Track payout tiers, commissions, reviews, and growth suggestions for every team member.</p>
        </div>
        <div class="worker-grid" id="worker-grid"></div>
      </div>
    </section>

    <section id="ad-marketplace" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Ad marketplace & partner discounts</h2>
          <p class="section-subtitle">Reserve banner inventory, broadcast campaigns worldwide, and sync partner coupons via browser extension.</p>
        </div>
        <div class="ad-grid">
          <div class="ad-form-card">
            <h3>Reserve banner placement</h3>
            <form id="ad-form" class="ad-form">
              <label class="form-label" for="ad-name">Campaign name</label>
              <input id="ad-name" name="ad-name" type="text" required />

              <label class="form-label" for="ad-region">Target region</label>
              <select id="ad-region" name="ad-region" required>
                <option value="global">Global</option>
                <option value="local">Local</option>
                <option value="international">International</option>
                <option value="corporate">Corporate affiliates</option>
              </select>

              <label class="form-label" for="ad-duration">Duration (weeks)</label>
              <input id="ad-duration" name="ad-duration" type="number" min="1" max="52" required />

              <div class="form-checkbox">
                <input id="ad-auto-credit" type="checkbox" name="ad-auto-credit" />
                <label for="ad-auto-credit">Auto-credit promo wallets when customers click ads</label>
              </div>

              <button class="btn btn-secondary" type="submit">Submit reservation</button>
            </form>
            <div class="form-feedback" id="ad-feedback"></div>
          </div>
          <div class="partner-directory">
            <h3>Partner discounts</h3>
            <div class="discount-list" id="discount-list"></div>
            <button class="btn btn-primary extension-button" type="button" data-extension-connect>Connect extension for live discounts</button>
            <p class="extension-note">Install the High Deff browser extension to sync partner coupons and automatically apply them at checkout.</p>
          </div>
          <div class="ad-summary" id="ad-summary"></div>
        </div>
      </div>
    </section>

    <section id="communication" class="section surface-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Communication & governance</h2>
          <p class="section-subtitle">Keep conversations flowing and alert the main account to critical changes, cash outs, and pricing updates.</p>
        </div>
        <div class="communication-grid">
          <div class="chat-panel">
            <h3>Community chat</h3>
            <div class="chat-log" id="chat-log"></div>
            <form id="chat-form" class="chat-input">
              <input id="chat-name" name="chat-name" type="text" placeholder="Display name" required />
              <input id="chat-message" name="chat-message" type="text" placeholder="Share an update" required />
              <button class="btn btn-primary" type="submit">Send</button>
            </form>
          </div>
          <div class="oversight-panel">
            <h3>Main account oversight</h3>
            <div class="oversight-log" id="oversight-log"></div>
            <div class="oversight-note">The main account receives notifications for cashout requests, pricing changes, discount updates, and late payment alerts.</div>
          </div>
        </div>
      </div>
    </section>

    <section id="governance" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Growth strategy & compliance</h2>
          <p class="section-subtitle">See projected milestones, risk controls, and investor guidance powering the High Deff network.</p>
        </div>
        <div class="governance-grid">
          <div class="growth-panel" id="growth-panel"></div>
          <div class="strategy-panel" id="strategy-panel"></div>
          <div class="policy-panel">
            <h3>Privacy & investor notices</h3>
            <div class="policy-body">
              <p><strong>Privacy:</strong> High Deff collects identity, address, device, and verification artifacts solely to manage rewards, payouts, and fraud prevention. Data is encrypted at rest, stored in dedicated environments, and never sold to third parties. Users may request export or deletion at any time.</p>
              <p><strong>Investor warnings:</strong> Participation involves exposure to cryptocurrency volatility, delayed withdrawals during compliance reviews, and partner program risk. High Deff does not guarantee profits and does not provide individualized financial advice.</p>
              <p><strong>Compliance workflow:</strong> Every loan, cash out, house, or NFT request triggers know-your-customer checks, blockchain monitoring, and policy-driven cooldowns. Corporate and debit card programs remain in closed beta and will roll out with enhanced licensing controls.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-layout">
      <div>
        <p>© ${new Date().getFullYear()} High Deff. All rights reserved.</p>
        <p>Powered by High Deff Tokens, community mining, and partner commerce.</p>
      </div>
      <div class="footer-links">
        <a href="#privacy">Privacy</a>
        <a href="#governance">Investor Warnings</a>
        <a href="#ad-marketplace">Advertise</a>
      </div>
    </div>
  </footer>
`;

type RewardGroup = 'local' | 'international' | 'corporate';

type RewardTier = {
  id: string;
  name: string;
  group: RewardGroup;
  summary: string;
  headlineYield: string;
  incentives: string[];
  tokenMix: string[];
};

type EcosystemCard = {
  title: string;
  description: string;
  highlight: string;
};

type EstateConcept = {
  title: string;
  description: string;
  mechanics: string[];
  minimums: string;
};

type TokenMetric = {
  label: string;
  value: string;
  detail: string;
};

type Discount = {
  name: string;
  baseTier: RewardGroup | 'global';
  perk: string;
  requirement: string;
};

type OrderInsight = {
  title: string;
  detail: string;
};

type GrowthInsight = {
  title: string;
  detail: string;
};

type StrategyPillar = {
  title: string;
  points: string[];
};

type WorkerProfile = {
  role: string;
  rewards: string;
  commission: string;
  insights: string[];
};

type TokenPaymentOption = {
  asset: string;
  network: string;
  fee: string;
};

type AdReservation = {
  campaign: string;
  region: string;
  durationWeeks: number;
  autoCredit: boolean;
  timestamp: string;
};

const rewardTiers: RewardTier[] = [
  {
    id: 'local-starter',
    name: 'Local Starter Hub',
    group: 'local',
    summary: 'Neighborhood businesses earn recurring crypto for deliveries, receipts, and in-person referrals.',
    headlineYield: 'Up to 1% daily simulation',
    incentives: [
      'Guaranteed 1,000 meme coins for every $100 monthly plan',
      '0.25% per click on affiliated storefronts linked through High Deff hub',
      'Free deliveries when customers stay on subscription plan',
    ],
    tokenMix: ['High Deff Token', 'Shiba Inu rewards', 'Partner NFTs'],
  },
  {
    id: 'local-donations',
    name: 'Community Donations Loop',
    group: 'local',
    summary: 'Enable donations, loans, and live auctions to keep goods moving before expiration.',
    headlineYield: 'Bonus crypto for daily tasks',
    incentives: [
      'Participating stores receive share of donations each month',
      'Live auctions unload inventory while other merchants promote the sale',
      'Earn rewards for uploading receipts and sharing surplus goods',
    ],
    tokenMix: ['High Deff Token', 'Safemoon cash bridge', 'Gift NFTs'],
  },
  {
    id: 'intl-expansion',
    name: 'International Expansion Pack',
    group: 'international',
    summary: 'Scale products into new regions with shipping partners and cost-per-click funding pools.',
    headlineYield: '0.5% per global sale',
    incentives: [
      'Unlock 10,000 merchant placements through High Deff partners',
      'Cross-sell inventory through hub stores and earn split commissions',
      'Access bonded housing NFTs valued up to $300,000',
    ],
    tokenMix: ['High Deff Token', 'Bitcoin rails', 'Ethereum staking'],
  },
  {
    id: 'intl-housing',
    name: 'NFT Estate Syndicate',
    group: 'international',
    summary: 'Collectively fund digital homes, highways, and donations that raise NFT equity.',
    headlineYield: '1.5× token multiplier after proof-of-work milestones',
    incentives: [
      'Fractional ownership tracked via High Deff NFTs and house bonds',
      'Rewards escalate based on network speed and mining throughput',
      'Option to sublease rooms and gift curated experiences to investors',
    ],
    tokenMix: ['High Deff Token', 'BNB network', 'PancakeSwap pools'],
  },
  {
    id: 'corp-governance',
    name: 'Corporate Governance Suite',
    group: 'corporate',
    summary: 'Centralize budgets, payouts, and compliance workflows across franchises.',
    headlineYield: '2% card cash-back (Coming Soon)',
    incentives: [
      'Instant cashouts with automated policy review and fraud scoring',
      'White-label storefronts for resellers & partner groups',
      'ACH, direct deposit, and payroll export with High Deff oversight alerts',
    ],
    tokenMix: ['High Deff Token', 'Stablecoin reserve', 'Corporate debit card (Coming Soon)'],
  },
  {
    id: 'corp-insights',
    name: 'Strategic Insights & Compliance',
    group: 'corporate',
    summary: 'Protect scale initiatives with privacy-first governance and investor-grade reporting.',
    headlineYield: 'Risk-adjusted performance dashboards',
    incentives: [
      'Automated alerts for cash outs, price changes, and late payments',
      'Centralized ad spend, donation tracking, and revenue projections',
      'Dedicated main account visibility into every sub-account event',
    ],
    tokenMix: ['High Deff Token', 'Regulated fiat ramps', 'Audit-ready data vault'],
  },
];

const ecosystemCards: EcosystemCard[] = [
  {
    title: 'Crypto mining orchestration',
    description: 'Automate High Deff Token mining while routing proof-of-work rewards into loyalty pools and housing NFTs.',
    highlight: 'Simulate hashrate, schedule payouts, and balance across 50+ meme coins.',
  },
  {
    title: 'Partner commerce loop',
    description: 'Sync partner stores, donations, and live auctions. Every receipt earns crypto and expands joint marketing.',
    highlight: 'Cross-promote inventory and share clicks across High Deff hubs.',
  },
  {
    title: 'Homes & NFT estates',
    description: 'Fractional "homes" and NFT vaults backed by mining flows, donations, and proof-of-stake milestones.',
    highlight: 'Gift network units, unlock bonded value, and resell on curated exchanges.',
  },
  {
    title: 'Loans & credit expansion',
    description: 'Provide micro-loans, debit cards, and corporate cards (coming soon) aligned with High Deff limits.',
    highlight: 'Govern loans per user with automatic repayment tracking and investor alerts.',
  },
];

const estateConcepts: EstateConcept[] = [
  {
    title: 'Gift-backed homes',
    description: 'Every participant gifts network units that accrue $1 per day minimum until the home valuation cap is met.',
    mechanics: [
      'Attach NFTs to rooms for additional income streams',
      'Network highways unlock faster delivery of goods and token rewards',
      'Sublease rooms or skip turns to share earnings with the next participant',
    ],
    minimums: 'Minimum $100 monthly participation. Houses list for sale once collective value exceeds $30,000.',
  },
  {
    title: 'Proof-of-work estates',
    description: 'Mining throughput and donations determine how quickly the estate unlocks resale or rental income.',
    mechanics: [
      'Divide mining yield between investors, donors, and High Deff vault',
      'Support Bitcoin, Ethereum, BNB, and future custom networks',
      'Guest voting influences appraised value of each home NFT',
    ],
    minimums: 'Requires verified identity, wallet, and High Deff token staking commitment.',
  },
  {
    title: 'Bonded house marketplace',
    description: 'Issue house bonds backed by High Deff collateral. Bonds can be traded or held for future ownership.',
    mechanics: [
      'Flexible timelines: 1 month flip or full-value hold',
      'Option to include multiple NFTs per house for diversified yields',
      'Donations feed investor pools, increasing long-term asset value',
    ],
    minimums: 'Participants allocate tokens monthly; High Deff executes compliance checks before resale.',
  },
];

const tokenMetrics: TokenMetric[] = [
  {
    label: 'Mining multiplier',
    value: '1.8× when receipts uploaded weekly',
    detail: 'Upload delivery receipts to unlock community pools that elevate High Deff Token multipliers.',
  },
  {
    label: 'Partner distribution',
    value: '10 business per $100 package',
    detail: 'Reward share extends across 10 businesses within every starter package purchased.',
  },
  {
    label: 'Loan collateral',
    value: 'Shiba + High Deff split',
    detail: 'Loan payouts combine Shiba Inu reserves with High Deff token escrow for transparent accounting.',
  },
];

const discountDirectory: Discount[] = [
  {
    name: 'Neighborhood Essentials',
    baseTier: 'local',
    perk: '10% off local delivery bundles + 0.25% crypto kickback',
    requirement: 'Subscribe to Local Starter Hub and verify address.',
  },
  {
    name: 'Global Merchants Collective',
    baseTier: 'international',
    perk: '0.5% token rebate on international shipments',
    requirement: 'Maintain 500 clicks/month shared with partner stores.',
  },
  {
    name: 'Corporate Insight Lab',
    baseTier: 'corporate',
    perk: '2% ad credit (Coming Soon) + governance analytics',
    requirement: 'Enroll with corporate debit card beta waitlist.',
  },
  {
    name: 'Universal NFT Vault',
    baseTier: 'global',
    perk: 'Bonus NFT minting credits for every High Deff Token purchase over 500 HDT',
    requirement: 'Submit wallet and enable investment features.',
  },
];

const orderInsights: OrderInsight[] = [
  {
    title: 'Delivery automation',
    detail: 'Assign dedicated drivers, include background checks, and schedule moving trucks for oversized goods.',
  },
  {
    title: 'Passive income stacking',
    detail: 'Every order can reroute up to 1% of spend into customer mining pools and NFT estates.',
  },
  {
    title: 'Partner escalation',
    detail: 'Trigger cross-promotion by forwarding your order to partner hubs for faster fulfilment.',
  },
];

const growthInsights: GrowthInsight[] = [
  {
    title: '1M annual goal',
    detail: '830 people spending $500 per month or 8,300 spending $10 monthly reach the $1,000,000 benchmark.',
  },
  {
    title: 'Referral compounding',
    detail: 'Earn 1% from 10 business referrals and 0.25% per click from community stores to accelerate treasury growth.',
  },
  {
    title: 'Donation leverage',
    detail: 'Recurring donations are cycled into meme coin pools and housing bonds to stabilize rewards during volatility.',
  },
];

const strategyPillars: StrategyPillar[] = [
  {
    title: 'Commerce orchestration',
    points: [
      'Automate three storefronts per business: High Deff, Shopify, and a rotating partner marketplace.',
      'Use live bidding to liquidate nearly expired products while marketing new arrivals.',
      'Bundle delivery, passive income, and partner referrals so every action creates residual value.',
    ],
  },
  {
    title: 'Risk management',
    points: [
      'Centralize identity, address, and verification data in encrypted vaults with opt-in deletion.',
      'Pause payouts if mining activity or pricing spikes breach High Deff safety thresholds.',
      'Corporate and debit cards undergo staged rollout with additional licensing gates (Coming Soon).',
    ],
  },
  {
    title: 'Investment transparency',
    points: [
      'Broadcast real-time alerts to the main account for loans, cashouts, price changes, and late payments.',
      'Provide downloadable signup packets for businesses and customers to review obligations offline.',
      'Encourage gift-based house units and NFT bonds to distribute value across the community.',
    ],
  },
];

const workerProfiles: WorkerProfile[] = [
  {
    role: 'Delivery Navigator',
    rewards: '1% share from ten recurring customers + crypto per completed task',
    commission: 'Base $10 per delivery with High Deff bonus tiers',
    insights: [
      'Receives invitations to other services for upsell opportunities.',
      'Can schedule moving trucks, install equipment, and earn skill-specific bonuses.',
      'Ratings unlock additional donation matches for community projects.',
    ],
  },
  {
    role: 'Store Curator',
    rewards: '0.25% per click on affiliate listings and NFT curation boosts',
    commission: 'Up to 5% fee when reselling partner inventory',
    insights: [
      'Maintains partner catalogs, pricing rules, and ad placements.',
      'Tracks customer reviews and escalates shipping exceptions to the main account.',
      'Receives suggestions based on top-selling categories across the network.',
    ],
  },
  {
    role: 'Investments Liaison',
    rewards: 'Bonus NFT mints monthly + staking multipliers for High Deff Tokens',
    commission: 'Performance-based share of cashout volume (post-review)',
    insights: [
      'Reviews housing bond requests and coordinates proof-of-stake audits.',
      'Manages compliance evidence for investor withdrawals.',
      'Collects feedback to refine High Deff growth strategies.',
    ],
  },
];

const tokenPaymentOptions: TokenPaymentOption[] = [
  { asset: 'Bitcoin', network: 'Lightning / SegWit', fee: '0.5% processing' },
  { asset: 'Ethereum', network: 'Layer 2', fee: '0.35% processing' },
  { asset: 'BNB', network: 'BNB Smart Chain', fee: '0.25% processing' },
  { asset: 'USDC', network: 'ACH settlement', fee: '0.15% processing' },
];

const tokenPriceIndex: Record<string, number> = {
  Bitcoin: 0.0000025,
  Ethereum: 0.000035,
  BNB: 0.00014,
  USDC: 1,
};

const oversightLog = document.getElementById('oversight-log');

const miningState = {
  isRunning: false,
  runtimeMinutes: 0,
  tokenBalance: 0,
  hashrate: 0,
  interval: null as ReturnType<typeof setInterval> | null,
};

function pushOversight(message: string) {
  if (!oversightLog) return;
  const entry = document.createElement('div');
  entry.className = 'oversight-entry';
  entry.innerHTML = `
    <div class="oversight-meta">
      <span class="oversight-time">${new Date().toLocaleString()}</span>
    </div>
    <p>${message}</p>
  `;
  oversightLog.prepend(entry);
}

function renderEcosystem() {
  const container = document.getElementById('ecosystem-grid');
  if (!container) return;
  container.innerHTML = ecosystemCards
    .map(
      (card) => `
        <article class="info-card">
          <h3>${card.title}</h3>
          <p>${card.description}</p>
          <div class="info-highlight">${card.highlight}</div>
        </article>
      `
    )
    .join('');
}

function renderRewardBrief() {
  const brief = document.getElementById('reward-brief');
  if (!brief) return;
  brief.innerHTML = `
    <h3>Rewards snapshot</h3>
    <ul class="brief-list">
      <li>Customers earn auto crypto from receipts, delivery tasks, and partner referrals.</li>
      <li>Businesses manage High Deff limits per user, distributing loans, houses, and NFT value.</li>
      <li>Corporate accounts orchestrate global payouts with governance alerts for the main account.</li>
    </ul>
    <p class="brief-note">Supabase integration ${isSupabaseConfigured ? 'is ready for syncing signups and orders.' : 'is not configured; data stays local until credentials are provided.'}</p>
  `;
}

function renderRewardTiers(targetGroup: RewardGroup | 'all' = 'all') {
  const grid = document.getElementById('reward-grid');
  if (!grid) return;
  const tiers = targetGroup === 'all' ? rewardTiers : rewardTiers.filter((tier) => tier.group === targetGroup);
  grid.innerHTML = tiers
    .map(
      (tier) => `
        <article class="reward-card" data-group="${tier.group}">
          <header>
            <span class="reward-group">${tier.group}</span>
            <h3>${tier.name}</h3>
            <p>${tier.summary}</p>
          </header>
          <div class="reward-yield">${tier.headlineYield}</div>
          <ul class="reward-list">
            ${tier.incentives.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <div class="reward-tokens">Token mix: ${tier.tokenMix.join(', ')}</div>
        </article>
      `
    )
    .join('');
}

function renderEstates() {
  const grid = document.getElementById('estate-grid');
  if (!grid) return;
  grid.innerHTML = estateConcepts
    .map(
      (concept) => `
        <article class="estate-card">
          <h3>${concept.title}</h3>
          <p>${concept.description}</p>
          <ul class="estate-mechanics">
            ${concept.mechanics.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <div class="estate-minimums">${concept.minimums}</div>
        </article>
      `
    )
    .join('');
}

function renderTokenMetrics() {
  const container = document.getElementById('token-metrics');
  if (!container) return;
  container.innerHTML = `
    <h3>Token metrics</h3>
    <ul class="token-metric-list">
      ${tokenMetrics
        .map(
          (metric) => `
            <li>
              <strong>${metric.label}:</strong>
              <span>${metric.value}</span>
              <p>${metric.detail}</p>
            </li>
          `
        )
        .join('')}
    </ul>
  `;
}

function populatePaymentOptions() {
  const select = document.getElementById('payment-token') as HTMLSelectElement | null;
  if (!select) return;
  select.innerHTML = tokenPaymentOptions
    .map((option) => `<option value="${option.asset}">${option.asset} (${option.network})</option>`)
    .join('');
}

function renderOrderInsights() {
  const container = document.getElementById('order-insight-cards');
  if (!container) return;
  container.innerHTML = orderInsights
    .map(
      (insight) => `
        <article class="insight-card">
          <h4>${insight.title}</h4>
          <p>${insight.detail}</p>
        </article>
      `
    )
    .join('');
}

function renderWorkerProfiles() {
  const container = document.getElementById('worker-grid');
  if (!container) return;
  container.innerHTML = workerProfiles
    .map(
      (profile) => `
        <article class="worker-card">
          <header>
            <h3>${profile.role}</h3>
            <p>${profile.rewards}</p>
          </header>
          <div class="worker-commission">Commission: ${profile.commission}</div>
          <ul class="worker-insights">
            ${profile.insights.map((point) => `<li>${point}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

function renderDiscounts() {
  const container = document.getElementById('discount-list');
  if (!container) return;
  container.innerHTML = discountDirectory
    .map(
      (discount) => `
        <article class="discount-card">
          <header>
            <span class="discount-tier">${discount.baseTier}</span>
            <h4>${discount.name}</h4>
          </header>
          <p class="discount-perk">${discount.perk}</p>
          <p class="discount-requirement">Requirement: ${discount.requirement}</p>
        </article>
      `
    )
    .join('');
}

function renderGrowthInsights() {
  const panel = document.getElementById('growth-panel');
  if (!panel) return;
  panel.innerHTML = growthInsights
    .map(
      (insight) => `
        <article class="growth-card">
          <h3>${insight.title}</h3>
          <p>${insight.detail}</p>
        </article>
      `
    )
    .join('');
}

function renderStrategyPillars() {
  const panel = document.getElementById('strategy-panel');
  if (!panel) return;
  panel.innerHTML = strategyPillars
    .map(
      (pillar) => `
        <article class="strategy-card">
          <h3>${pillar.title}</h3>
          <ul>
            ${pillar.points.map((point) => `<li>${point}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');
}

function setupRewardToggle() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-reward-filter]');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      renderRewardTiers(button.dataset.rewardFilter as RewardGroup | 'all');
    });
  });
}

function setupMiningConsole() {
  const startButton = document.querySelector<HTMLButtonElement>('[data-action="start-mining"]');
  const stopButton = document.querySelector<HTMLButtonElement>('[data-action="stop-mining"]');
  const statusPill = document.querySelector<HTMLSpanElement>('[data-mining-status]');
  const runtimeLabel = document.querySelector<HTMLParagraphElement>('[data-mining-runtime]');
  const hashrateLabel = document.querySelector<HTMLParagraphElement>('[data-mining-hashrate]');
  const balanceLabel = document.querySelector<HTMLParagraphElement>('[data-mining-balance]');

  if (!startButton || !stopButton || !statusPill || !runtimeLabel || !hashrateLabel || !balanceLabel) {
    return;
  }

  const updateDisplay = () => {
    runtimeLabel.textContent = `${miningState.runtimeMinutes}m`;
    hashrateLabel.textContent = `${miningState.hashrate.toFixed(2)} GH/s`;
    balanceLabel.textContent = `${miningState.tokenBalance.toFixed(4)} HDT`;
  };

  const tick = () => {
    miningState.runtimeMinutes += 1;
    miningState.hashrate = 35 + Math.random() * 15;
    miningState.tokenBalance += miningState.hashrate * 0.0003;
    updateDisplay();
  };

  startButton.addEventListener('click', () => {
    if (miningState.isRunning) return;
    miningState.isRunning = true;
    statusPill.textContent = 'Active';
    statusPill.classList.add('active');
    startButton.setAttribute('disabled', 'true');
    stopButton.removeAttribute('disabled');
    miningState.interval = setInterval(tick, 1000 * 6);
    pushOversight('Mining session activated. Monitoring for security and payout eligibility.');
  });

  stopButton.addEventListener('click', () => {
    if (!miningState.isRunning) return;
    miningState.isRunning = false;
    statusPill.textContent = 'Offline';
    statusPill.classList.remove('active');
    stopButton.setAttribute('disabled', 'true');
    startButton.removeAttribute('disabled');
    if (miningState.interval) {
      clearInterval(miningState.interval);
      miningState.interval = null;
    }
    pushOversight('Mining session paused. Balances retained for future allocation.');
  });

  updateDisplay();
}

function serializeForm(form: HTMLFormElement) {
  const data = new FormData(form);
  const payload: Record<string, unknown> = {};
  for (const [key, value] of data.entries()) {
    if (value instanceof File) continue;
    const existing = payload[key];
    if (existing !== undefined) {
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        payload[key] = [existing, value];
      }
    } else {
      payload[key] = value;
    }
  }
  return payload;
}

function downloadJsonFile(filename: string, data: Record<string, unknown>) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function setupConditionalSections(form: HTMLFormElement) {
  const toggles = form.querySelectorAll<HTMLInputElement>('[data-conditional-toggle]');
  const sections = form.querySelectorAll<HTMLElement>('.conditional-section');

  const refresh = () => {
    sections.forEach((section) => {
      const condition = section.dataset.condition;
      const isActive = Array.from(toggles).some(
        (toggle) => toggle.dataset.conditionalToggle === condition && toggle.checked
      );
      section.classList.toggle('active', isActive);
      const focusable = section.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea');
      focusable.forEach((element) => {
        if ('required' in element) {
          element.required = isActive;
        }
      });
    });
  };

  toggles.forEach((toggle) => toggle.addEventListener('change', refresh));
  refresh();
}

function setupFileUploads(input: HTMLInputElement, previewList: HTMLElement) {
  input.addEventListener('change', () => {
    previewList.innerHTML = '';
    const files = input.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const item = document.createElement('li');
      const autoName = `${file.name.split('.')[0]}-${Date.now()}`;
      item.textContent = `${autoName}.${file.name.split('.').pop()}`;
      previewList.appendChild(item);
    });
  });
}

function updateProgress(form: HTMLFormElement, progressDisplay: HTMLElement) {
  const elements = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input, select, textarea'));
  const required = elements.filter((element) => element.required);
  const filled = required.filter((element) => {
    if (element instanceof HTMLInputElement && element.type === 'file') {
      return element.files && element.files.length > 0;
    }
    return Boolean(element.value);
  });
  const percent = required.length === 0 ? 100 : Math.round((filled.length / required.length) * 100);
  progressDisplay.textContent = `${percent}% complete`;
  progressDisplay.style.setProperty('--progress-value', `${percent}%`);
}

async function logToSupabase(table: string, payload: Record<string, unknown>) {
  if (!supabase) return;
  try {
    const { error } = await supabase.from(table).insert([payload]);
    if (error) {
      console.warn(`Supabase insert failed for ${table}:`, error.message);
    }
  } catch (error) {
    console.warn(`Supabase insert error for ${table}:`, error);
  }
}

function setupSignupForms() {
  const forms = document.querySelectorAll<HTMLFormElement>('.signup-form');
  const downloadsContainer = document.getElementById('signup-downloads');

  forms.forEach((form) => {
    const progressDisplay = form.querySelector<HTMLElement>('.progress-indicator');
    if (!progressDisplay) return;
    setupConditionalSections(form);

    const uploadInput = form.querySelector<HTMLInputElement>('input[type="file"]');
    const previewList = form.querySelector<HTMLElement>('.upload-preview');
    if (uploadInput && previewList) {
      setupFileUploads(uploadInput, previewList);
    }

    form.addEventListener('input', () => updateProgress(form, progressDisplay));

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const feedback = form.querySelector<HTMLElement>('.form-feedback');
      if (!feedback || !downloadsContainer) return;

      const data = serializeForm(form);
      const timestamp = new Date().toISOString();
      const type = form.dataset.signupType ?? 'unknown';
      data.timestamp = timestamp;
      data.signupType = type;

      downloadJsonFile(`${type}-signup-${Date.now()}.json`, data);

      const entry = document.createElement('article');
      entry.className = 'signup-download';
      entry.innerHTML = `
        <header>
          <h4>${type.toUpperCase()} signup saved</h4>
          <span>${new Date(timestamp).toLocaleString()}</span>
        </header>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      `;
      downloadsContainer.prepend(entry);

      if (isSupabaseConfigured) {
        await logToSupabase('signups', data);
      }

      feedback.textContent = 'Application saved. Downloaded a copy and alerted main account.';
      pushOversight(`${type.toUpperCase()} signup captured with ${Object.keys(data).length} fields.`);
      form.reset();
      updateProgress(form, progressDisplay);
    });

    updateProgress(form, progressDisplay);
  });
}

function setupOrderForm() {
  const form = document.getElementById('order-form') as HTMLFormElement | null;
  const feedback = document.getElementById('order-feedback');
  const summary = document.getElementById('order-summary');

  if (!form || !feedback || !summary) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = serializeForm(form);
    const type = payload['order-type'] as string;
    const cryptoApplied = Boolean(payload['order-crypto']);
    const entry = document.createElement('article');
    entry.className = 'order-card';
    entry.innerHTML = `
      <header>
        <span class="order-type">${type}</span>
        <h4>${payload['order-description']}</h4>
        <p>Budget: $${payload['order-budget']}</p>
      </header>
      <p>Delivery by: ${payload['order-deadline']}</p>
      <p>${cryptoApplied ? 'Mining rewards applied to this order.' : 'Standard payment terms applied.'}</p>
    `;
    summary.prepend(entry);
    feedback.textContent = 'Order submitted. Logistics team notified.';
    pushOversight(`Order submitted (${type}). Budget $${payload['order-budget']}.`);
    if (isSupabaseConfigured) {
      await logToSupabase('orders', payload);
    }
    form.reset();
  });
}

const adReservations: AdReservation[] = [];

function setupAdForm() {
  const form = document.getElementById('ad-form') as HTMLFormElement | null;
  const feedback = document.getElementById('ad-feedback');
  const summary = document.getElementById('ad-summary');

  if (!form || !feedback || !summary) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = serializeForm(form);
    const reservation: AdReservation = {
      campaign: (data['ad-name'] as string) ?? 'Campaign',
      region: (data['ad-region'] as string) ?? 'global',
      durationWeeks: Number(data['ad-duration'] ?? 0),
      autoCredit: Boolean(data['ad-auto-credit']),
      timestamp: new Date().toISOString(),
    };
    adReservations.unshift(reservation);
    renderAdSummary();
    feedback.textContent = 'Ad reservation received. Billing will follow review.';
    pushOversight(`Ad reservation for ${reservation.campaign} targeting ${reservation.region}.`);
    if (isSupabaseConfigured) {
      await logToSupabase('ad_reservations', reservation as unknown as Record<string, unknown>);
    }
    form.reset();
  });
}

function renderAdSummary() {
  const summary = document.getElementById('ad-summary');
  if (!summary) return;
  if (adReservations.length === 0) {
    summary.innerHTML = '<p class="empty-state">No ad reservations yet. Submit a campaign to see it here.</p>';
    return;
  }
  summary.innerHTML = adReservations
    .map(
      (reservation) => `
        <article class="ad-card">
          <header>
            <h4>${reservation.campaign}</h4>
            <span>${new Date(reservation.timestamp).toLocaleString()}</span>
          </header>
          <p>Region: ${reservation.region}</p>
          <p>Duration: ${reservation.durationWeeks} weeks</p>
          <p>${reservation.autoCredit ? 'Promo wallets will be auto-credited on click.' : 'Manual promo management.'}</p>
        </article>
      `
    )
    .join('');
}

function setupExtensionButton() {
  const button = document.querySelector<HTMLButtonElement>('[data-extension-connect]');
  if (!button) return;
  button.addEventListener('click', () => {
    pushOversight('Discount extension requested. Provide installation link to requestor.');
    button.textContent = 'Extension request received';
    button.setAttribute('disabled', 'true');
  });
}

function setupChat() {
  const form = document.getElementById('chat-form') as HTMLFormElement | null;
  const log = document.getElementById('chat-log');
  if (!form || !log) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = (data.get('chat-name') as string) || 'Guest';
    const message = data.get('chat-message') as string;
    const entry = document.createElement('div');
    entry.className = 'chat-entry';
    entry.innerHTML = `
      <span class="chat-time">${new Date().toLocaleTimeString()}</span>
      <strong>${name}:</strong>
      <span>${message}</span>
    `;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
    pushOversight(`New chat message from ${name}.`);
    form.reset();
  });
}

function setupTokenPurchase() {
  const form = document.getElementById('token-purchase-form') as HTMLFormElement | null;
  const feedback = document.getElementById('token-purchase-feedback');
  if (!form || !feedback) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const amount = Number(data.get('purchase-amount') ?? 0);
    const paymentAsset = (data.get('payment-token') as string) ?? 'USDC';
    const wallet = (data.get('wallet-address') as string) ?? '';
    if (!amount || !wallet) {
      feedback.textContent = 'Enter amount and wallet address to continue.';
      return;
    }
    const rate = tokenPriceIndex[paymentAsset];
    const quote = rate ? amount * rate : amount;
    feedback.textContent = `Estimated cost: ${quote.toFixed(4)} ${paymentAsset}. Confirmation sent to main account.`;
    pushOversight(`Token purchase quoted: ${amount} HDT via ${paymentAsset}.`);
    if (isSupabaseConfigured) {
      await logToSupabase('token_quotes', {
        amount,
        paymentAsset,
        wallet,
        quote,
        timestamp: new Date().toISOString(),
      });
    }
    form.reset();
  });
}

function setupCashoutForm() {
  const form = document.getElementById('cashout-form') as HTMLFormElement | null;
  const feedback = document.getElementById('cashout-feedback');
  if (!form || !feedback) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const amount = Number(data.get('cashout-amount') ?? 0);
    const method = data.get('payout-method') as string;
    const schedule = data.get('cashout-schedule') as string;
    feedback.textContent = `Cash out request for ${amount} HDT via ${method} queued. Compliance review in progress.`;
    pushOversight(`Cash out request detected (${amount} HDT via ${method}) target ${schedule}.`);
    if (isSupabaseConfigured) {
      await logToSupabase('cashouts', {
        amount,
        method,
        schedule,
        timestamp: new Date().toISOString(),
      });
    }
    form.reset();
  });
}

function bootstrapMetrics() {
  const partners = document.querySelector('[data-metric="partners-count"]');
  if (partners) {
    partners.textContent = String(10 * discountDirectory.length);
  }
}

function initializePortal() {
  renderEcosystem();
  renderRewardBrief();
  renderRewardTiers('all');
  renderEstates();
  renderTokenMetrics();
  renderOrderInsights();
  renderWorkerProfiles();
  renderDiscounts();
  renderAdSummary();
  renderGrowthInsights();
  renderStrategyPillars();
  populatePaymentOptions();
  setupRewardToggle();
  setupMiningConsole();
  setupSignupForms();
  setupOrderForm();
  setupAdForm();
  setupExtensionButton();
  setupChat();
  setupTokenPurchase();
  setupCashoutForm();
  bootstrapMetrics();
}

initializePortal();
