import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Camera } from 'lucide-react';
import { SERVICES } from '../config';
import { authFetch } from '../utils/api';

const Profile = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        bio: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // 🔹 LOAD PROFILE FROM BACKEND
    useEffect(() => {
        console.log("Profile Page - User State:", user); // DEBUG

        if (!user?.id) {
            console.warn("No user ID found in AuthContext. Please Logout and Login.");
            return;
        }

        console.log(`Fetching profile: ${SERVICES.PROFILE}/${user.id}`); // DEBUG

        // SERVICES.PROFILE is .../api/users
        authFetch(`${SERVICES.PROFILE}/${user.id}`)
            .then(res => {
                if (!res.ok) throw new Error('Failed to load profile');
                return res.json();
            })
            .then(data => {
                setFormData({
                    name: data.name || '',
                    email: data.email || user.email,
                    role: data.role || '',
                    bio: data.bio || ''
                });
                setLoading(false);
            })
            .catch(err => {
                console.error('Profile load error:', err);
                setLoading(false);
            });
    }, [user]);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // 🔹 SAVE PROFILE
    const handleSave = async () => {
        try {
            setSaving(true);

            setSaving(true);

            // PUT /api/users/{id}
            const res = await authFetch(
                `${SERVICES.PROFILE}/${user.id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: formData.name,
                        role: formData.role,
                        bio: formData.bio
                    })
                }
            );

            if (!res.ok) throw new Error('Save failed');

            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert('Profile save failed. Check backend logs.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading profile...</p>;
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 700 }}>
                Profile
            </h1>

            <div className="card fade-in">
                {/* HEADER */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                        marginBottom: '2rem',
                        flexWrap: 'wrap'
                    }}
                >
                    {/* AVATAR */}
                    <div style={{ position: 'relative' }}>
                        <div
                            style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '4px solid var(--color-bg-main)',
                                boxShadow: 'var(--shadow-md)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#6366f1',
                                color: 'white',
                                fontSize: '3rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase'
                            }}
                        >
                            {formData.name?.charAt(0) || 'U'}
                        </div>

                        {isEditing && (
                            <button
                                style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                    backgroundColor: 'var(--color-primary)',
                                    color: 'white',
                                    padding: '0.5rem',
                                    borderRadius: '50%'
                                }}
                                title="Change Avatar (future)"
                            >
                                <Camera size={18} />
                            </button>
                        )}
                    </div>

                    <div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                            {formData.name}
                        </h2>
                        <p style={{ color: 'var(--color-text-muted)' }}>
                            {formData.email}
                        </p>
                    </div>
                </div>

                {/* FORM */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <Input
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                                Role
                            </label>
                            <input
                                className="input-field"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                disabled={!isEditing}
                                style={{ opacity: !isEditing ? 0.7 : 1 }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Bio
                        </label>
                        <textarea
                            className="input-field"
                            rows="4"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            disabled={!isEditing}
                            style={{ resize: 'none', opacity: !isEditing ? 0.7 : 1 }}
                        />
                    </div>

                    {/* ACTIONS */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                        {isEditing ? (
                            <>
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    style={{
                                        width: 'auto',
                                        backgroundColor: 'transparent',
                                        border: '1px solid var(--color-border)'
                                    }}
                                    disabled={saving}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={handleSave}
                                    style={{ width: 'auto' }}
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </>
                        ) : (
                            <Button onClick={() => setIsEditing(true)} style={{ width: 'auto' }}>
                                Edit Profile
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
